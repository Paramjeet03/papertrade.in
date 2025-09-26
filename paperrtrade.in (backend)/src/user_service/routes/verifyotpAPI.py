from fastapi import HTTPException , APIRouter
from user_service.services.otp import verify
from pydantic import EmailStr

router=APIRouter()

@router.post("/")
def verifyOTP(email: EmailStr,otp:str):
    try:
        return verify(email,otp)
    except Exception as e:
        raise e
 