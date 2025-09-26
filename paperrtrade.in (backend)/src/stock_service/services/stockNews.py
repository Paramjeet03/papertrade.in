import requests
from Config.Config import setting

def news(sym: str):
    all_news = []
    try:
        url = f"https://finnhub.io/api/v1/company-news?symbol={sym}&from=2025-09-01&to=2025-09-15&token={setting.API_KEY}"
        news_data = requests.get(url).json()

        # Take top 10 items safely
        if isinstance(news_data, list):
            news_list = news_data[:10]
        elif isinstance(news_data, dict) and "data" in news_data:
            news_list = news_data["data"][0:15]
        else:
            news_list = []

        for i in news_list:
            if isinstance(i, dict):  # Ensure i is a dict
                new = {
                    "company": i.get("related", ""),   # default empty string if key missing
                    "headline": i.get("headline", ""),
                    "source": i.get("source", ""),
                    "summary": i.get("summary", ""),
                    "image": i.get("image", ""),
                    "url": i.get("url", "")
                }
                all_news.append(new)

        return all_news

    except Exception as e:
        # You can log e here if needed
        raise e
