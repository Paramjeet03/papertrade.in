import yfinance as yf
import math

def get_price_change(sym: str):
    ticker = yf.Ticker(sym)
    data = ticker.history(period="6d")
    
    if len(data) < 2:
        return {"error": f"Not enough data for {sym}"}
    
    prev_close = float(data['Close'].iloc[-2])
    current_close = float(data['Close'].iloc[-1])
    
    abs_change = current_close - prev_close
    
    # avoid division by zero
    perc_change = (abs_change / prev_close * 100) if prev_close != 0 else 0.0

    # sanitize output for JSON
    result = {
        "abs": abs_change,
        "perc": perc_change,
    }

    for k, v in result.items():
        if isinstance(v, float) and (math.isnan(v) or math.isinf(v)):
            result[k] = None  # or 0

    return result
