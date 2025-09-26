from fastapi import APIRouter, HTTPException
from pydantic import EmailStr
from user_service.services.otp import sendotp as send_otp_service

router = APIRouter()

@router.post("/send-otp")
def send_otp(mail: EmailStr):
    try:
        send_otp_service(mail)
        return {"status": "success", "message": "OTP sent successfully"}
    except Exception as e:
        raise e
