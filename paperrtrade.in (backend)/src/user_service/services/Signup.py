from user_service.Database.db_modal import allUserTable,balance
from user_service.Database.engineSession import engine,Base
from user_service.Database.engineSession import Session
from fastapi import HTTPException, status
from argon2 import PasswordHasher
from sqlalchemy.exc import IntegrityError
from datetime import datetime
import pytz

ph = PasswordHasher(
    time_cost=3,
    memory_cost=65536,
    parallelism=4,
    hash_len=32,
    salt_len=16
)

def hash_password(pswd: str):
    return ph.hash(password=pswd)

def signUp(data):
    data.pass_hash = hash_password(data.pass_hash)
    now = datetime.now(pytz.utc)

    user_dict = data.dict()
    user_dict.setdefault("create_at", now)
    user_dict.setdefault("updated_at", now)

    try:
        with Session() as db:
            # Check duplicate email
            if db.query(allUserTable).filter(allUserTable.email == data.email).first():
                raise HTTPException(status_code=409, detail="Email already exists")

            # Create user
            new_user = allUserTable(**user_dict)
            db.add(new_user)

            db.flush()
            
            # Add signup bonus
            new_balance = balance(u_id=new_user.u_id, operation="SignUp Bonus", balance=1000.0)
            db.add(new_balance)

            db.commit()
            db.refresh(new_user)
            db.refresh(new_balance)

            print(f"✅ User created: {new_user.email}, ID: {new_user.u_id}")
            return {"msg": "User created successfully", "user_id": new_user.u_id}

    except IntegrityError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Database integrity error: {e.orig}")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Internal server error: {str(e)}")
