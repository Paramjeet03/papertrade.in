from fastapi import FastAPI
from user_service.routes import signupAPI,otpsendAPI,verifyotpAPI,loginAPI,getUserProfileAPI
from stock_service.routes import oneweek,onemonth,oneyear,getnews,priceChange,stocklogodesc
from trade_service.routes import tradeAPI
from fastapi.middleware.cors import CORSMiddleware
app=FastAPI()


origins = [
    "http://localhost:5173", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(signupAPI.router,prefix="/user_service/signup",tags=["Signup"])
app.include_router(loginAPI.router,prefix="/user_service/login",tags=["Login"])


app.include_router(otpsendAPI.router,prefix="/user_service/signup/otp",tags=["OTP"])
app.include_router(verifyotpAPI.router,prefix="/user_service/signup/otp",tags=["OTP"])


app.include_router(oneweek.router,prefix="/stockService/oneWeek",tags=["Stockservice"])
app.include_router(onemonth.router,prefix="/stockService/oneMonth",tags=["Stockservice"])
app.include_router(oneyear.router,prefix="/stockService/oneYear",tags=["Stockservice"])
app.include_router(priceChange.router,prefix="/stockService/get_priceChange",tags=["Stockservice"])

app.include_router(getnews.router,prefix="/stockService/stockNews",tags=["Stockservice-News"])

app.include_router(stocklogodesc.router,prefix="/stockService/stockInfo",tags=["Stockservice-Description"])

app.include_router(getUserProfileAPI.router,prefix="/user_profile",tags=["PROFILE"])


app.include_router(tradeAPI.router,prefix="/trade",tags=["Buy/Sell"])