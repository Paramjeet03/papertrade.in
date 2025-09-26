from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    SENDER_MAIL:str
    PSWD:str
    SECRET_KEY:str
    ALGORITHUM:str
    ACCESS_TOKEN_EXPIRE_MINUTES:int
    API_KEY:str

    
    model_config = {
        "env_file": ".env"
    }
    
setting=Settings()