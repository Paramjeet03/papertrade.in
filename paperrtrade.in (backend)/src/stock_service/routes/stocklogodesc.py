from fastapi import APIRouter,Body
from stock_service.services.stockLogoDescription import stockInfo

router=APIRouter()

@router.post("/")
def stockDescription(sym:str = Body(..., embed=True)):
    return stockInfo(symbol=sym)