import pandas as pd
import numpy as np

def calculate_moving_average(df: pd.DataFrame, window: int = 7) -> pd.Series:
    """Calculate the moving average of the closing prices."""
    return df['Close'].rolling(window=window).mean()

def calculate_daily_return(df: pd.DataFrame) -> float:
    """Calculate the latest daily return percentage."""
    if len(df) < 2:
        return 0.0
    latest_price = df['Close'].iloc[-1]
    previous_price = df['Close'].iloc[-2]
    return ((latest_price - previous_price) / previous_price) * 100

def calculate_52w_high_low(df: pd.DataFrame):
    """Calculate the 52-week high and low from a 1-year dataframe."""
    return df['High'].max(), df['Low'].min()

def calculate_7d_volatility_score(df: pd.DataFrame):
    returns = df['Close'].pct_change()
    roll_std = returns.rolling(window=7).std()
    volatility = roll_std.iloc[-1]
    
    if pd.isna(volatility):
        volatility = 0.0
        
    if volatility > 0.03:
        score = "High Risk 🔴"
    elif volatility > 0.015:
        score = "Medium Risk 🟡"
    else:
        score = "Low Risk 🟢"
        
    return float(volatility), score

def calculate_sentiment(df: pd.DataFrame) -> str:
    current_close = df['Close'].iloc[-1]
    ma_7 = df['Close'].rolling(window=7).mean().iloc[-1]
    daily_return = calculate_daily_return(df)
    
    if current_close > ma_7 and daily_return > 0:
        return "Strong Bullish 🚀"
    elif current_close < ma_7:
        return "Bearish 🔻"
    else:
        return "Neutral 😐"
