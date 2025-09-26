import requests
from Config.Config import setting


def stockInfo(symbol:str):
    API_KEY = setting.API_KEY

    url = f"https://finnhub.io/api/v1/stock/profile2?symbol={symbol}&token={API_KEY}"
    response = requests.get(url).json()

    logo_url = response.get("logo")
    company_name = response.get("name")
    industry = response.get("finnhubIndustry")
    ipo_date = response.get("ipo")
    country = response.get("country")
    market_cap = response.get("marketCapitalization")
    description = (
        f"{company_name} is a leading company in the {industry} sector, "
        f"headquartered in {country}. It went public on {ipo_date} "
        f"and currently has a market capitalization of about {market_cap} billion USD."
    )

    describe_dict={"logo_url":logo_url,"company_name":company_name,"industry": industry,"ipo_date":ipo_date,"country":country,"market_cap":str(market_cap) +" Billion USD","description":description}
    return describe_dict
