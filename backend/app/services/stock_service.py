import yfinance as yf
import pandas as pd
from app.utils.calculations import (
    calculate_moving_average,
    calculate_daily_return,
    calculate_52w_high_low,
    calculate_7d_volatility_score,
    calculate_sentiment
)
from app.models.schemas import DataPoint

class StockService:
    @staticmethod
    def _format_history(df: pd.DataFrame, column: str) -> list[DataPoint]:
        """Helper to convert pandas Series to standardized DataPoint list."""
        result = []
        for index, value in df[column].dropna().items():
            result.append(DataPoint(
                date=index.strftime('%Y-%m-%d'),
                price=round(float(value), 2)
            ))
        return result

    @staticmethod
    def get_companies():
        """Return a static list of popular tech companies for the dashboard selector."""
        return [
            {"symbol": "AAPL", "name": "Apple Inc."},
            {"symbol": "MSFT", "name": "Microsoft Corporation"},
            {"symbol": "GOOGL", "name": "Alphabet Inc."},
            {"symbol": "AMZN", "name": "Amazon.com Inc."},
            {"symbol": "TSLA", "name": "Tesla Inc."},
            {"symbol": "NVDA", "name": "NVIDIA Corporation"},
            {"symbol": "META", "name": "Meta Platforms Inc."}
        ]

    @staticmethod
    def get_stock_data(symbol: str, period: str = "3mo"):
        """Fetch timeseries data (prices and moving average) for chart rendering."""
        ticker = yf.Ticker(symbol)
        df = ticker.history(period=period)
        if df.empty:
            raise ValueError(f"No history data found for symbol: {symbol}")
             
        history = StockService._format_history(df, "Close")
        
        df['MA7'] = calculate_moving_average(df, 7)
        ma_history = StockService._format_history(df, "MA7")
        
        return history, ma_history

    @staticmethod
    def get_stock_summary(symbol: str):
        """Fetch summary statistics and current metrics for a specific stock."""
        ticker = yf.Ticker(symbol)
        # Fetch 1y data minimally to calculate 52w high/low
        df = ticker.history(period="1y")
        if df.empty:
            raise ValueError(f"No summary data found for symbol: {symbol}")

        current_price = df['Close'].iloc[-1]
        daily_return = calculate_daily_return(df)
        high_52w, low_52w = calculate_52w_high_low(df)
        vol_7d, vol_score = calculate_7d_volatility_score(df)
        volume = int(df['Volume'].iloc[-1])
        average_price = df['Close'].mean()
        sentiment = calculate_sentiment(df)

        return {
            "symbol": symbol,
            "current_price": round(current_price, 2),
            "daily_return": round(daily_return, 2),
            "high_52w": round(high_52w, 2),
            "low_52w": round(low_52w, 2),
            "volatility": round(vol_7d, 4),
            "volume": volume,
            "average_price": round(average_price, 2),
            "volatility_score": vol_score,
            "sentiment": sentiment
        }
