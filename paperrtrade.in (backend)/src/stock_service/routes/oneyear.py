from fastapi import APIRouter,Body
from stock_service.services.oneYear import stockInfo

router=APIRouter()

@router.post("/")
def oneYear(sym:str = Body(..., embed=True)):
    return stockInfo(sym=sym)