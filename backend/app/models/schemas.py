from pydantic import BaseModel
from typing import List

class Company(BaseModel):
    symbol: str
    name: str

class DataPoint(BaseModel):
    date: str
    price: float

class StockDataResponse(BaseModel):
    symbol: str
    history: List[DataPoint]
    moving_average: List[DataPoint]

class StockSummaryResponse(BaseModel):
    symbol: str
    current_price: float
    daily_return: float
    high_52w: float
    low_52w: float
    volatility: float
    volume: int
    average_price: float
    volatility_score: str
    sentiment: str

class CompareDataResponse(BaseModel):
    symbol1: str
    symbol2: str
    history1: List[DataPoint]
    history2: List[DataPoint]
