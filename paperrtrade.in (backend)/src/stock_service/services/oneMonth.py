import yfinance as yf
def stockInfo(sym:str):
    try:
        ticker=yf.Ticker(sym.upper())
        data=ticker.history(period="1mo",interval="1d")
        data=data.reset_index()
        data["Date"]=data["Date"].astype(str)
        jsonData=data.to_dict(orient="records")
        return jsonData
    except Exception as e:
        raise e