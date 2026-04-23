from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import stocks

app = FastAPI(
    title="Stock Data Intelligence API",
    description="API for fetching and processing stock data for the Stock Dashboard.",
    version="1.0.0"
)

# Configure CORS for React frontend (Vite defaults)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect routing
app.include_router(stocks.router)

@app.get("/")
def root():
    return {"message": "Stock Dashboard API is running. Access /docs for Swagger UI."}
