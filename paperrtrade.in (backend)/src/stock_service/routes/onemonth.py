from fastapi import APIRouter,Body
from stock_service.services.oneMonth import stockInfo

router=APIRouter()

@router.post("/")
def oneMonth(sym:str = Body(..., embed=True)):
    return stockInfo(sym=sym)