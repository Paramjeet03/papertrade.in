from fastapi import APIRouter, Depends, HTTPException, status
from user_service.services.getUserProfile import getProfile
from Config.Config import setting
from jose import jwt, JWTError
from user_service.services.logIN import oauth_scheme

router = APIRouter()

@router.get("/")
def get_user_profile(token: str = Depends(oauth_scheme)):
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token missing"
        )

    try:
        payload = jwt.decode(
            token,
            setting.SECRET_KEY,
            algorithms=[setting.ALGORITHUM] 
        )
        return getProfile(payload["email"])

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )
