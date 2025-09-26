from pydantic import BaseModel ,EmailStr,field_validator
from datetime import datetime

class hold(BaseModel):
    u_id:int
    holding:str
    quantity:int
    buying_price:float
    
    @field_validator("*")
    def notEmpty(cls,v,info):
        if v is None:
            raise ValueError(f"{info.field_name} cannot be null")
        if isinstance(v,str) and not v.strip():
            raise ValueError(f"{info.field_name} cannot be empty")
        return v
    

class t_hist(BaseModel):
    t_id:int
    operation:str
    amount:int
    time:float
    
    @field_validator("*")
    def notEmpty(cls,v,info):
        if v is None:
            raise ValueError(f"{info.field_name} cannot be null")
        if isinstance(v,str) and not v.strip():
            raise ValueError(f"{info.field_name} cannot be empty")
        return v