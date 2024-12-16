import subprocess
from sit_automation.sut_communication.ssh_connect import SSH_Connect
import time

def retry(times, delay):
    '''
    Decorator to retry a function multiple times with a delay if it returns False.
    :param times: Number of retry attempts.
    :param delay: Delay between retries in seconds.
    '''
    def decorator(func):
        def wrapper(*args, **kwargs):
            for attempt in range(times):
                result = func(*args, **kwargs)
                if result:
                    return True
                print(f"Attempt {attempt + 1} failed, retrying in {delay} seconds...")
                time.sleep(delay)
            print("All attempts failed.")
            return False
        return wrapper
    return decorator


class Common_Function():
    def __init__(self, sut_info:dict, test_module:dict):
        self.sut_info = sut_info
        self.test_module = test_module
        os_network_devices = self.sut_info['os']['network']
        self.os_ip = ''
        for device_name, info in os_network_devices.items():
            if info['ip_addr'] is not None and info["ip_addr"].strip() != "":
                self.os_ip = info['ip_addr']
                break

    def test_function(self, function_name:str):
        if function_name == 'Get Ping OS status':
            return self.ping_sut()
        elif function_name == 'Get OS SSH connection status':
            return self.check_os_connection()
        elif function_name == 'Wait':
            return self.wait(int(self.test_module['category_parameter']))


    def ping_sut(self, ):
        try:
            result = subprocess.run(f'ping -c 5 {self.os_ip}', shell=True, capture_output=True, text=True)
            result = {'output':result.stdout, 'error':result.stderr}
            return True, result
        except Exception as e:
            return False, {'output':'', 'error':e}

    def ping_bmc(self):
        result = subprocess.run(f'ping -c 5 {self.sut_bmc_info["bmc_ip"]}', shell=True, capture_output=True, text=True)
        result = {'output':result.stdout, 'error':result.stderr}
        if '5 packets transmitted, 5 received, 0% packet loss' in result['output']:
            return True
        else:
            return False

    def check_os_connection(self):
        try:
            ssh = SSH_Connect(self.sut_ssh_info['host_ip'], self.sut_ssh_info['user_name'], self.sut_ssh_info['password'])
            ssh_status = ssh.connect()
            print(ssh_status)
            if ssh_status:
                return True
            else:
                return False
        except Exception as e:
            return False

    def wait(self, wait_time:int):
        time.sleep(wait_time)
        return True, {'output':'', 'error':''}