from sqlalchemy import Column, Integer, String, DateTime ,ForeignKey ,Float
from sqlalchemy.orm import declarative_base
from datetime import datetime, timezone
import pytz
from user_service.Database.engineSession import Base

# Function to get current UTC time
def utc_now():
    return datetime.now(timezone.utc)

class allUserTable(Base):
    __tablename__ = "allusertable"

    u_id = Column(Integer, primary_key=True)
    username = Column(String(50))
    email = Column(String(100), unique=True)
    pass_hash = Column(String(255))
    phone = Column(String(15))
    avatar_url = Column(String(255))


    create_at = Column(DateTime, default=utc_now)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now)

    def to_dict(self):
        """Return dict with timestamps converted to IST"""
        IST = pytz.timezone("Asia/Kolkata")
        return {
            "u_id": self.u_id,
            "username": self.username,
            "email": self.email,
            "phone": self.phone,
            "avatar_url": self.avatar_url,
            "create_at": self.create_at.astimezone(IST).strftime("%Y-%m-%d %H:%M:%S") if self.create_at else None,
            "updated_at": self.updated_at.astimezone(IST).strftime("%Y-%m-%d %H:%M:%S") if self.updated_at else None
        }

class balance(Base):
    __tablename__="balance"
    
    b_id=Column(Integer,primary_key=True)
    u_id=Column(Integer,ForeignKey("allusertable.u_id"))
    date=Column(DateTime,default=utc_now)
    operation=Column(String(100))
    balance=Column(Float)
    
    def to_dict(self):
        return {"b_id":self.b_id,"u_id":self.u_id,"date":self.date,"operation":self.operation,"balance":self.balance}

class Holding(Base):
    __tablename__ = "holdings"
    
    h_id = Column(Integer, primary_key=True)
    u_id = Column(Integer, ForeignKey("allusertable.u_id"))
    stock_symbol = Column(String(20))
    quantity = Column(Integer)
    
    def to_dict(self):
        return {"h_id":self.h_id,"u_id":self.u_id,"stock_symbol":self.stock_symbol,"quantity":self.quantity}
    

