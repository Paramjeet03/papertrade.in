from trade_service.Database.database import holdings,trade_hist
from user_service.Database.db_modal import balance
from user_service.Database.engineSession import Session,engine,Base
from trade_service.models import hold,t_hist
from user_service.models import B_alance


def trade(data:hold,data2:t_hist,data3:B_alance):
    db=Session()
    Base.metadata.create_all(bind=engine, checkfirst=True)
    try:
        db=Session()
        h1=holdings(data)
        db.add(h1)
        h2=trade_hist(data2)
        db.add(h2)
        h3=balance(data3)
        db.commit()
    except Exception as e:
        raise e
    finally:
        db.close_all()
    
    
        
        
        
       