from fastapi import APIRouter
from user_service.services.Signup import signUp
from user_service.models import newUserSignUp
from user_service.Database.engineSession import engine
from user_service.Database.db_modal import allUserTable

router=APIRouter()

@router.post("/")
def signup(data:newUserSignUp):
        allUserTable.__table__.create(bind=engine, checkfirst=True)
        signUp(data=data)
        return {"message":"Account is created sucessfully"}
    