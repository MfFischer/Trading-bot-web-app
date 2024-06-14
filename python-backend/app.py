from flask import Flask, jsonify, request
from tradingbot import TradingBot

app = Flask(__name__)
bot = TradingBot()

@app.route('/trade-decision/<ticker>', methods=['GET'])
def trade_decision(ticker):
    decision = bot.trade_decision(ticker)
    return jsonify({"decision": decision})

@app.route('/stock-data/<ticker>', methods=['GET'])
def stock_data(ticker):
    data = bot.get_stock_data(ticker)
    return jsonify(data)

@app.route('/sentiment-analysis/<ticker>', methods=['GET'])
def sentiment_analysis(ticker):
    sentiment = bot.get_sentiment_analysis(ticker)
    return jsonify(sentiment)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)
