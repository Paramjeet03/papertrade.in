from fastapi import APIRouter,HTTPException,status
from user_service.models import B_alance
from trade_service.models import hold,t_hist
from trade_service.services.trade import trade
router=APIRouter()
@router.post("/")
def tradeAPI(d:hold,d2:t_hist,d3:B_alance):
    try:
        trade(data=d,data2=d2,data3=d3)
    except Exception as e:
        raise HTTPException( status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error: " + str(e))
