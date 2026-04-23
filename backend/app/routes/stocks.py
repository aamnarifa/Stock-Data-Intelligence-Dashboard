from fastapi import APIRouter, HTTPException
from typing import List
from app.models.schemas import (
    Company,
    StockDataResponse,
    StockSummaryResponse,
    CompareDataResponse
)
from app.services.stock_service import StockService

router = APIRouter(prefix="/api/stocks", tags=["stocks"])

@router.get("/companies", response_model=List[Company])
def get_companies():
    """Retrieve a list of available companies."""
    return StockService.get_companies()

@router.get("/data/{symbol}", response_model=StockDataResponse)
def get_stock_data(symbol: str):
    """Retrieve timeseries data for a specific stock."""
    try:
        history, ma_history = StockService.get_stock_data(symbol)
        return StockDataResponse(
            symbol=symbol,
            history=history,
            moving_average=ma_history
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/summary/{symbol}", response_model=StockSummaryResponse)
def get_stock_summary(symbol: str):
    """Retrieve current summary metrics for a specific stock."""
    try:
        summary = StockService.get_stock_summary(symbol)
        return StockSummaryResponse(**summary)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/compare", response_model=CompareDataResponse)
def get_compare_data(symbol1: str, symbol2: str):
    """Retrieve timeseries data for two stocks to compare."""
    try:
        history1, _ = StockService.get_stock_data(symbol1)
        history2, _ = StockService.get_stock_data(symbol2)
        return CompareDataResponse(
            symbol1=symbol1,
            symbol2=symbol2,
            history1=history1,
            history2=history2
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")
