from fastapi import APIRouter ,Body
from stock_service.services.stockNews import news

router=APIRouter()

@router.post("/")
def stocknews(sym:str=Body(...,embed=True)):
    return news(sym=sym)