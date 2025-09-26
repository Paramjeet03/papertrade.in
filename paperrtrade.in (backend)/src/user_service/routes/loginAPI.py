from fastapi import APIRouter,Response
from fastapi.responses import JSONResponse
from user_service.models import logIn
from user_service.services import logIN

router = APIRouter()

@router.post("/")
def login_endpoint(data: logIn ,response: Response ):
    
    result = logIN.login(data,response)  
    return JSONResponse(content=result)