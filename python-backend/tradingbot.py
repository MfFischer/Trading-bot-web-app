import requests
from bs4 import BeautifulSoup
import re
import json

class TradingBot:
    def __init__(self):
        self.base_url = "https://finance.yahoo.com/quote/"
        
    def get_stock_data(self, ticker):
        url = f"{self.base_url}{ticker}"
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        scripts = soup.find_all('script')
        for script in scripts:
            if 'root.App.main' in script.text:
                json_text = re.search(r'root.App.main\s+=\s+(\{.*\})', script.text).group(1)
                data = json.loads(json_text)
                return data['context']['dispatcher']['stores']['QuoteSummaryStore']
        
    def get_sentiment_analysis(self, ticker):
        # Example placeholder for sentiment analysis
        return {"ticker": ticker, "sentiment": "positive"}
    
    def trade_decision(self, ticker):
        stock_data = self.get_stock_data(ticker)
        sentiment = self.get_sentiment_analysis(ticker)
        # Simple logic to decide to buy or sell based on sentiment
        if sentiment['sentiment'] == 'positive':
            return f"Buy {ticker}"
        else:
            return f"Sell {ticker}"
