
from fastapi import FastAPI, APIRouter, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, RedirectResponse
from sit_automation import routes
from fastapi.middleware.cors import CORSMiddleware


#add cors function due to the browser is not allowed to access with different port, so need to add cors
# reference: https://fastapi.tiangolo.com/tutorial/cors 
origins = [
    "http://localhost",
    "http://127.0.0.1:27017",
    "http://127.0.0.1:8000", 
    "http://localhost:8000",
    "http://localhost:27017"
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="sit_automation/static"), name="static")
templates = Jinja2Templates(directory=f"templates")
app.include_router(routes.router)
 
@app.get("/", response_class=HTMLResponse)
async def index(request:Request):

    return RedirectResponse(url="/sit_automation")
