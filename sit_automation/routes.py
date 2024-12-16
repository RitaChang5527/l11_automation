from fastapi import FastAPI, APIRouter, Request, HTTPException, Form, File, UploadFile, WebSocket, BackgroundTasks
from starlette.websockets import WebSocketDisconnect
from fastapi.responses import RedirectResponse, PlainTextResponse, FileResponse
from typing import List, Optional, Dict, Any
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import os
from os import path
from pymongo import MongoClient
from motor.motor_asyncio import AsyncIOMotorClient
import json
from bson import json_util, ObjectId
from datetime import datetime
import asyncio
import concurrent.futures
import paramiko
from sit_automation.test_module.os_test import OS_Version
from sit_automation.test_module.bmc_test import IPMI
from sit_automation.test_module.log_compare import Log_Compare
from sit_automation.test_module.common_function import Common_Function
import time
import shutil  # 添加此行以导入shutil模块


# MongoDB Configuration
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGODB_URL)
router = APIRouter(
    prefix="/sit_automation",
    tags=["sit_automation"]
)

dir_path = path.dirname(path.realpath(__file__))

templates = Jinja2Templates(directory=f"{dir_path}/templates")
router.mount("/static", StaticFiles(directory=f"{dir_path}/static"), name="static")
test_log = ''


#Connection Manager is to mange the active connections of websocket
class ConnectionManager:
    def __init__(self):
        # Use dictionary to manage each client connection and history
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, sut_id: str):
        
        if sut_id not in self.active_connections:
            self.active_connections[sut_id] = []
        self.active_connections[sut_id].append(websocket)
        print('--Connect--')
        print(sut_id)
        print(websocket)
        # if client is detail page, send history at first
        
    def disconnect(self, websocket: WebSocket, sut_id: str):
        if sut_id in self.active_connections:
            self.active_connections[sut_id].remove(websocket)
            if not self.active_connections[sut_id]:
                del self.active_connections[sut_id]
        print('--Disconnect--')
        print(self.active_connections)

    async def send_message(self, sut_id: str, message: dict):
        if sut_id in self.active_connections:
            for connection in self.active_connections[sut_id]:
                try:
                    await connection.send_json(message)
                except Exception as e:
                    self.active_connections[sut_id].remove(connection)

    async def broadcast(self, sut_id: str, message: str):
        for connections in self.active_connections.values():
            for connection in connections:
                try:
                    await connection.send_json(message)
                except Exception as e:
                    self.active_connections[sut_id].remove(connection)


websocket_manager = ConnectionManager()
tasks: Dict[str, Dict] = {}



@router.get("/")
async def index(request: Request):
    
    context={
        "request":request,
        "page_title":"Dashboard Light"
    }
    
    #return {"test2":"test2"}
    return templates.TemplateResponse("index.html",context)
    #return templates.TemplateResponse("400.html")

@router.get("/workflow_editor")
async def index(request: Request):    
    context={
        "request":request,
        "page_title":"Dashboard Light"
    }
    return templates.TemplateResponse("project/workflow_editor.html",context)

@router.get("/sut_dashboard")
async def index(request: Request):
    
    context={
        "request":request,
        "page_title":"Dashboard Light"
    }
    return templates.TemplateResponse("project/sut_dashboard.html",context)

@router.get("/edit_sut/{sut_id}")
async def edit_sut(request: Request,sut_id: str):
    db = client['sit_automation']
    collection = db['servers']
    item = await collection.find_one({"_id": ObjectId(sut_id)})
    context={
        "request":request,
        "page_title":"Dashboard Light",
        "sut_info":item
    }
    return templates.TemplateResponse("project/edit_sut.html",context)

@router.post("/edit_sut/{sut_id}/update")
async def edit_sut(sut_id: str,
    test_cycle: int = Form(...),
    clear_sel_first: str = Form(None),
    stop_if_fail: str = Form(None),
    check_golden_sample: str = Form(None),
    retry_count: int = Form(...),
    retry_interval: int = Form(...),
    workflow_file: UploadFile = None
):    
    update_data = {"test_parameters.test_cycle": test_cycle, 
                  "test_parameters.clear_sel_first": clear_sel_first,
                  "test_parameters.stop_if_fail": stop_if_fail, 
                  "test_parameters.check_golden_sample": check_golden_sample,
                  "test_parameters.retry_count": retry_count,
                  "test_parameters.retry_interval": retry_interval,
                  "update_time": datetime.utcnow(),}
    if workflow_file.filename != '':
        upload_dir = f"sit_automation/static/uploads/{sut_id}"
        os.makedirs(upload_dir, exist_ok=True)
        workflow_file_path = os.path.join(upload_dir, workflow_file.filename)
        with open(workflow_file_path, "wb") as f:
            f.write(workflow_file.file.read())
        update_data["test_parameters.workflow_file"] = workflow_file.filename
    db = client['sit_automation']
    collection = db['servers']    

    update_result = await collection.update_one(
        {"_id": ObjectId(sut_id)},
        {"$set": update_data},
    )
    return RedirectResponse(url=f"/sit_automation/sut_dashboard", status_code=302)

# deal with SUT testing section
#----------
@router.get("/sut_detail_test/{sut_id}")
async def sut_detail_test(request: Request, sut_id: str):
    context={
        "request":request,
        "sut_id":sut_id,
    }
    return templates.TemplateResponse("project/sut_detail_test.html",context)

@router.post("/start_test/{sut_id}")
async def start_test(background_tasks: BackgroundTasks, sut_id: str):
    if sut_id in tasks and tasks[sut_id]['running']:
        return {"message": "SUT is testing now"}
    tasks[sut_id] = {'running': True}
    # add background task
    background_tasks.add_task(execute_commands, sut_id)
    await update_item(Request, 'sit_automation', 'servers', sut_id, {"sut_status.test_status": "Running"})

@router.post("/stop_test/{sut_id}")
async def stop_test(sut_id: str):
    await update_item(Request, 'sit_automation', 'servers', sut_id, {"sut_status.test_status": "Stop"})
    if sut_id in tasks and tasks[sut_id]['running']:
        tasks[sut_id]['running'] = False
        await websocket_manager.send_message(sut_id, {'status': 'Stop'})
        return {"status":"Stop", "message": f"Received stop request for {sut_id}, testing will be stopped when the current command is finished"} 
    await websocket_manager.send_message(sut_id, {'status': 'Stop'})
    return {"status":"Stop", "message": "SUT is not testing now"}

# execute commands and write to test.log
async def execute_commands(sut_id: str):
    db = client['sit_automation']
    collection = db['servers']    
    sut_info = await collection.find_one({"_id": ObjectId(sut_id)})
    os_network_devices = sut_info['os']['network']
    os_ip = ''
    for device_name, info in os_network_devices.items():
        if info['ip_addr'] is not None and info["ip_addr"].strip() != "":
            os_ip = info['ip_addr']
            break
    os_user_name = sut_info.get('os', {}).get('login_info', {}).get('user_name', '')
    os_password = sut_info.get('os', {}).get('login_info', {}).get('password', '')
    bmc_ip = sut_info.get('bmc', {}).get('network', {}).get('ip_addr', '0.0.0.0')
    bmc_user_name = sut_info.get('bmc', {}).get('login_info', {}).get('user_name', '')
    bmc_password = sut_info.get('bmc', {}).get('login_info', {}).get('password', '')
    cycle_count = int(sut_info.get('test_parameters', {}).get('test_cycle', 0))
    retry_count = int(sut_info.get('test_parameters', {}).get('retry_count', 0))
    retry_interval = int(sut_info.get('test_parameters', {}).get('retry_interval', 0))
    stop_if_fail = sut_info.get('test_parameters', {}).get('stop_if_fail', 'off')
    workflow_file = f"sit_automation/static/uploads/{sut_id}/{sut_info.get('test_parameters', {}).get('workflow_file', '')}"
    with open(workflow_file, "r", encoding="utf-8") as file:
        test_workflow = json.load(file)

    test_module_collection = db['test_modules']  
    log_dir = f"sit_automation/static/uploads/{sut_id}/logs/{datetime.now().strftime('%Y_%m_%d_%H_%M_%S')}"
    os.makedirs(log_dir, exist_ok=True)
    test_log = f'{log_dir}/test.json'
    log_compare = Log_Compare()
    with open(test_log, 'w') as f:
        pass
    for current_cycle in range(cycle_count+1):
        # create cycle directory, cycle_0 is golden sample
        cycle_result = []
        if current_cycle==0:
            cycle_dir = f'{log_dir}/golden_sample'
        os.makedirs(cycle_dir, exist_ok=True)
        for module_num, test_module in enumerate(test_workflow):
            print(test_module)
            test_condition = await test_module_collection.find_one({"category": test_module['category'], "sub_category": test_module['sub_category'], "function": test_module['function']})
            command = test_condition['command']
            compare_method = test_condition['result_check']['check_method']
            os.makedirs(f"{cycle_dir}/{test_module['category']}", exist_ok=True)
            module_log = f"{cycle_dir}/{test_module['category']}/{test_condition['result_check']['log_name']}"
            await websocket_manager.send_message(sut_id, {'status': 'Running', 'cycle': current_cycle, 'command': f'[Execute]Step{module_num+1}:{command}', 'output': '', 'compare_result': '', 'differences': ''})
            retry_if_fail = test_condition['result_check']['retry_if_fail']
            for retry_num in range(retry_count):
                if test_module['category'].lower() == 'os':
                    os_test = OS_Version.select_os('Linux')                                
                    if command != 'specific_commands':
                        command_status, command_result = await asyncio.to_thread(os_test.common_command,{'host_ip': os_ip, 'user_name': os_user_name, 'password': os_password}, module_log, command)
                    else:
                        command_status, command_result = await asyncio.to_thread(os_test.specific_command,{'host_ip': os_ip, 'user_name': os_user_name, 'password': os_password}, module_log, test_condition)
                elif test_module['category'].lower() == 'bmc':
                    ipmi = IPMI({'host_ip': os_ip, 'user_name': os_user_name, 'password': os_password}, {'bmc_ip': bmc_ip, 'user_name': bmc_user_name, 'password': bmc_password})
                    management_interface = test_module['category_parameter']
                    command_status, command_result = await asyncio.to_thread(ipmi.common_command,module_log, command, management_interface)
                    print(command_status)
                    print(command_result)
                elif test_module['category'].lower() == 'common':
                    common_function = Common_Function(sut_info, test_module)
                    command_status, command_result = await asyncio.to_thread(common_function.test_function, test_module['function'])
                compare_result = True
                differences = ''
                #if current_cycle != 0:
                if retry_if_fail == True or current_cycle != 0:
                    if compare_method[0] == 'compare_without_sort':
                        compare_result, differences = log_compare.compare_without_sort(module_log, 
                                f"{log_dir}/golden_sample/{test_module['category']}/{test_condition['result_check']['log_name']}", test_condition['result_check']['ignore_check_keywords'])
                    elif compare_method[0] == 'compare_with_sort':
                        compare_result, differences = log_compare.compare_with_sort(module_log, 
                                f"{log_dir}/golden_sample/{test_module['category']}/{test_condition['result_check']['log_name']}", test_condition['result_check']['ignore_check_keywords'])
                    elif compare_method[0] == 'check_log_keywords':
                        compare_result, differences = log_compare.check_log_keyword(module_log, test_module['check_keywords'], test_condition['result_check']['return_if_keyword_exist'])
                    elif compare_method[0] == 'check_return_keywords':
                        print(command_result['output'])
                        compare_result, differences = log_compare.check_return_keyword(command_result['output'], test_module['check_keywords'], test_condition['result_check']['return_if_keyword_exist'])
                        print(compare_result)
                    elif  compare_method[0] == 'compare_meminfo':
                        compare_result, differences = log_compare.compare_meminfo(module_log, f"{log_dir}/golden_sample/{test_module['category']}/{test_condition['result_check']['log_name']}", 1000)
                    elif  compare_method[0] == 'compare_meminfo':
                        compare_result, differences = log_compare.compare_meminfo(module_log, f"{log_dir}/golden_sample/{test_module['category']}/{test_condition['result_check']['log_name']}", 1000)
                    print(f'-{compare_result}')
                if compare_result == False and retry_if_fail == True and retry_num < retry_count-1:
                    await websocket_manager.send_message(sut_id, {'status': 'Running', 'cycle': current_cycle, 'command': f'[Warning] Compare {command} result is failed, retry after {retry_interval} sec, retry count:{retry_num+1}', 'output': '', 'compare_result': '', 'differences': ''})
                    await asyncio.sleep(retry_interval)
                    continue
                

                cycle_result.append(compare_result)

                try:
                    await websocket_manager.send_message(sut_id, {
                            'status': 'Running',
                            'cycle': current_cycle,
                            'command': f'[Execute]Step{module_num+1}:{command}',
                            'output': command_result['output'],
                            'compare_result': compare_result,
                            'differences': differences
                        })
                except Exception as e:
                    pass
                save_to_history(test_log, {'cycle': current_cycle, 'command': f'[Execute]Step{module_num+1}:{command}', 'output': command_result['output'], 
                'compare_result': compare_result, 'differences': differences})
                if not tasks[sut_id]['running']:
                    break
                break
            if not tasks[sut_id]['running']:
                    break
        if not tasks[sut_id]['running']:
            break
        
        cycle_status = False if False in cycle_result else True
        # return the result of the cycle
        await websocket_manager.send_message(sut_id, {'status': 'Running', 'cycle': current_cycle,'cycle_result': cycle_status})
        if cycle_status == False and stop_if_fail == 'on':
            break
    testing_status = ''
    if not tasks[sut_id]['running']:
        testing_status = 'Completed'
    elif cycle_status == False:
        testing_status = 'Fail'
    elif cycle_status == True:
        testing_status = 'Pass'
    tasks[sut_id]['running'] = False
    await update_item(Request, 'sit_automation', 'servers', sut_id, {"sut_status.test_status": testing_status})
    await websocket_manager.send_message(sut_id, {'status': testing_status})

@router.get("/get_history/{sut_id}")
async def get_history(sut_id: str):
    # Read the history from log
    log_dir = f"sit_automation/static/uploads/{sut_id}/logs"
    last_dir = [folder for folder in os.listdir(log_dir) if os.path.isdir(os.path.join(log_dir, folder))]
    last_dir.sort()    
    test_log = f'{log_dir}/{last_dir[-1]}/test.json'
    try:
        with open(test_log, "r") as f:
            history = json.load(f)
        return {"logs": history}
    except Exception as e:
        return {"logs": []}
    
def save_to_history(test_log, cycle_result):
    # read the log of the history
    try:
        with open(test_log, "r") as f:
            history = json.load(f)
    except Exception as e:
        history = []
    history.append(cycle_result)

    # add last command and response then write back
    with open(test_log, "w") as f:
        json.dump(history, f, indent=4)

# WebSocket route
@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        # receive client type（index or detail）
        data = await websocket.receive_text()
        data_json = json.loads(data)
        sut_id = data_json.get('sut_id')
        websocket.state.sut_id = sut_id
        await websocket_manager.connect(websocket, sut_id)
        while True:
            await websocket.send_text(json.dumps({"status": "Check_alive", "timestamp": time.time()}))
            await asyncio.sleep(5)  # Keep the connection alive
    except WebSocketDisconnect:
        websocket_manager.disconnect(websocket, websocket.state.sut_id)


#----------
# database access section
#----------
@router.get("/access_db/{db_name}/{collection_name}")
async def get_all_item(request: Request, db_name: str, collection_name: str, query_path: str = None):
    db = client[db_name]
    collection = db[collection_name]
    if query_path is None:        
        data = await collection.find().to_list()
        data = [object_id_to_str(doc) for doc in data]
        return json.loads(json_util.dumps(data))
    else:
        cursor = collection.find({})
        results = []
        async for document in cursor:     
            value = document
            for key in query_path.split('.'):
                value = value.get(key) if isinstance(value, dict) else None
                if value is None:
                    break
            results.append({"_id": str(document["_id"]), "value": value})
        
        # 如果查無資料
        if not any(results):
            raise HTTPException(status_code=404, detail="No matching data found")

        return {"results": results}

@router.post("/access_db/{db_name}/{collection_name}")
async def create_item(db_name: str, collection_name: str, item: Dict[str, Any]):
    try:
        db = client[db_name]
        collection = db[collection_name]
        result = await collection.insert_one(item)
        return True, ''
    except Exception as e:
        return False, e

@router.put("/access_db/{db_name}/{collection_name}/{item_id}")
async def update_item(request: Request, db_name: str, collection_name: str, item_id: str, item: dict):
    db = client[db_name]
    collection = db[collection_name]
    update_result = await collection.update_one(
        {"_id": ObjectId(item_id)},
        {"$set": item},
    )

@router.delete("/access_db/{db_name}/{collection_name}/{item_id}")
async def delete_item(request: Request, db_name: str, collection_name: str, item_id: str):
    db = client[db_name]
    collection = db[collection_name]
    delete_result = await collection.delete_one({"_id": ObjectId(item_id)})
    return delete_result.deleted_count

# Due to _id in MongoDB is ObjectId, need to change ObjectId to string
def object_id_to_str(data):
    if isinstance(data, list):
        for item in data:
            item["_id"] = str(item["_id"])
    else:
        data["_id"] = str(data["_id"])
    return data
#----------

@router.post("/edit_sut/{sut_id}/update")
async def edit_sut(sut_id: str,
    test_cycle: int = Form(...),
    clear_sel_first: str = Form(None),
    stop_if_fail: str = Form(None),
    check_golden_sample: str = Form(None),
    retry_count: int = Form(...),
    retry_interval: int = Form(...),
    workflow_file: UploadFile = None
):    
    update_data = {"test_parameters.test_cycle": test_cycle, 
                  "test_parameters.clear_sel_first": clear_sel_first,
                  "test_parameters.stop_if_fail": stop_if_fail, 
                  "test_parameters.check_golden_sample": check_golden_sample,
                  "test_parameters.retry_count": retry_count,
                  "test_parameters.retry_interval": retry_interval,
                  "update_time": datetime.utcnow(),}
    if workflow_file.filename != '':
        upload_dir = f"sit_automation/static/uploads/{sut_id}"
        os.makedirs(upload_dir, exist_ok=True)
        workflow_file_path = os.path.join(upload_dir, workflow_file.filename)
        with open(workflow_file_path, "wb") as f:
            f.write(workflow_file.file.read())
        update_data["test_parameters.workflow_file"] = workflow_file.filename
    db = client['sit_automation']
    collection = db['servers']    

    update_result = await collection.update_one(
        {"_id": ObjectId(sut_id)},
        {"$set": update_data},
    )
    return RedirectResponse(url=f"/sit_automation/sut_dashboard", status_code=302)

@router.get("/show_log_record/{sut_id}")
async def show_log_record(request: Request, sut_id: str):
    
    sut_dir = f"sit_automation/static/uploads/{sut_id}"
    print(sut_dir)
    log_dir = f"{sut_dir}/logs"
    print(sut_dir)
    log_dirs = [d for d in os.listdir(log_dir) if os.path.isdir(os.path.join(log_dir, d))]
    log_dirs.sort(reverse=True)
    
    print(log_dirs)
    context={
        "request":request,
        "sut_id":sut_id,
    }
    return log_dirs

@router.get("/download_log/{sut_id}/{log_dir}")
async def download_log(request: Request, sut_id: str, log_dir: str):
    log_dir_path = f"sit_automation/static/uploads/{sut_id}/logs/{log_dir}"
    zip_file_path = f"sit_automation/static/uploads/{sut_id}/logs/{log_dir}.zip"
    
    # zip log directory
    try:
        shutil.make_archive(zip_file_path[:-4], 'zip', log_dir_path)
    except Exception as e:
        print(f"Error zipping log directory: {e}")
        return {"error": "Failed to create zip file."}
    
    # use FileResponse to return zip file
    return FileResponse(zip_file_path, media_type='application/zip', filename=f"{log_dir}.zip")
    
