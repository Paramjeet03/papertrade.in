from sqlalchemy.orm import declarative_base
from sqlalchemy import Column,Integer,String,ForeignKey,Float,DateTime
from datetime import datetime
from user_service.Database.db_modal import Base

class holdings(Base):
    __tablename__="holdings"
    
    h_id=Column(Integer,primary_key=True)
    u_id=Column(Integer,ForeignKey("allusertable.u_id"))
    holdings=Column(String(50))
    quantity=Column(Integer)
    buying_price=Column(Float)
    
    def to_dict(self):
        return {
            "h_id":self.h_id,
            "u_id":self.u_id,
            "holdings":self.holdings,
            "quantity":self.quantity,
            "buying_price":self.buying_price
        }
        
class trade_hist(Base):
    __tablename__="trade_hist"

    t_id=Column(Integer,primary_key=True)
    h_id=Column(Integer,ForeignKey("holdings.h_id"))
    operation=Column(String(100))
    ammount=Column(Integer)
    time=Column(DateTime,default=datetime.now)

    def to_dict(self):
        return {
            "t_id":self.t_id,
            "h_id":self.h_id,
            "operation":self.operation,
            "ammount":self.ammount,
            "time":self.time
        }
        
    