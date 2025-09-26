from pydantic import BaseModel ,EmailStr,field_validator
from datetime import datetime

class newUserSignUp(BaseModel):
    username:str
    email:EmailStr
    pass_hash:str
    phone:str
    avatar_url:str
    
    @field_validator("*")
    def notEmpty(cls,v,info):
        if v is None:
            raise ValueError(f"{info.field_name} cannot be null")
        if isinstance(v,str) and not v.strip():
            raise ValueError(f"{info.field_name} cannot be empty")
        return v
    
    
class logIn(BaseModel):
    email:EmailStr
    plain_pass:str
    
    
    @field_validator("*")
    def notEmpty(cls,v,info):
        if v is None:
            raise ValueError(f"{info.field_name} cannot be null")
        if isinstance(v,str) and not v.strip():
            raise ValueError(f"{info.field_name} cannot be empty")
        return v
    

class B_alance(BaseModel):
    u_id:int
    date:datetime
    operation:str
    balance:float
    
    
    
    @field_validator("*")
    def notEmpty(cls,v,info):
        if v is None:
            raise ValueError(f"{info.field_name} cannot be null")
        if isinstance(v,str) and not v.strip():
            raise ValueError(f"{info.field_name} cannot be empty")
        return v
    
