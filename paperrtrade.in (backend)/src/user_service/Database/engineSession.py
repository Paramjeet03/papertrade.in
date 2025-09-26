from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from Config.Config import setting
from sqlalchemy.orm import declarative_base
Base=declarative_base()
engine=create_engine(setting.DATABASE_URL, echo=True)
Session=sessionmaker(bind=engine)
