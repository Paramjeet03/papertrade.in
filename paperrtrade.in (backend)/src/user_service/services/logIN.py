from fastapi import Response, HTTPException, status
from user_service.models import logIn
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from user_service.Database.engineSession import Session
from user_service.Database.db_modal import allUserTable
from jose import  jwt
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timezone, timedelta
from Config.Config import setting

ph = PasswordHasher()

oauth_scheme=OAuth2PasswordBearer(tokenUrl="/user_service/login/")

def verify_pass(hashed_password: str, plain_password: str):
    try:
        return ph.verify(hashed_password, plain_password)
    except VerifyMismatchError:
        return False

def createToken(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=setting.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, setting.SECRET_KEY, algorithm=setting.ALGORITHUM)

def login(data: logIn, response: Response):
    result=False
    db = Session()
    try:
        user = db.query(allUserTable).filter(allUserTable.email == data.email).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

        if not verify_pass(user.pass_hash, data.plain_pass):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid password")
        result=True
        token = createToken({"u_id": user.u_id, "email": user.email})
        response.set_cookie(key="access_token", value=token, httponly=True, samesite="lax")
        return {"access_token": token, "token_type": "bearer" ,"result":result}

    finally:
        db.close()
