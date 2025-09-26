from user_service.Database.db_modal import allUserTable, balance
from user_service.Database.engineSession import Session
from fastapi import HTTPException

def getProfile(Email: str):
    db = Session()
    user = db.query(allUserTable).filter(allUserTable.email == Email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    newBalance = db.query(balance).filter(balance.u_id == user.u_id).all()
    
    user_data = user.to_dict()
    newBalance_data = [p.to_dict() for p in newBalance]
    user_data["portfolio"] = newBalance_data
    db.close()
    return user_data

        
