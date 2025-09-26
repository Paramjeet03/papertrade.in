import yfinance as yf

def stockInfo(sym: str):
    try:
        ticker = yf.Ticker(sym.upper())
        data = ticker.history(period="5d", interval="90m")
        data = data.reset_index()
        if "Datetime" in data.columns:
            data["Datetime"] = data["Datetime"].astype(str)
        elif "Date" in data.columns:
            data["Datetime"] = data["Date"].astype(str)
            data.drop(columns=["Date"], inplace=True)
        else:
            raise ValueError("No datetime column found in the data!")

        jsonData = data.to_dict(orient="records")
        return jsonData

    except Exception as e:
        raise e
