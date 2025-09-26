from fastapi import APIRouter,Body
from stock_service.services.priceChange import get_price_change

router=APIRouter()

@router.post("/")
def priceChange(sym:str = Body(..., embed=True)):
    return get_price_change(sym=sym)