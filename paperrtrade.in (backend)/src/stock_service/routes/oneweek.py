from fastapi import APIRouter,Body
from stock_service.services.oneWeekInfo import stockInfo

router=APIRouter()

@router.post("/")
def oneweek(sym:str = Body(..., embed=True)):
    return stockInfo(sym=sym)