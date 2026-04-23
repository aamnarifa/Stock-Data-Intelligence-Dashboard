import React, { useState, useEffect } from 'react';
import StockSelector from '../components/StockSelector';
import MetricsCard from '../components/MetricsCard';
import StockChart from '../components/StockChart';
import CompareChart from '../components/CompareChart';
import SummaryCard from '../components/SummaryCard';
import InsightBox from '../components/InsightBox';
import { getStockData, getStockSummary, getCompareData } from '../services/api';

const Dashboard = () => {
  const [symbol, setSymbol] = useState('');
  const [compareSymbol, setCompareSymbol] = useState('');
  
  const [stockData, setStockData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [compareData, setCompareData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Default to AAPL if no symbol is selected initially
    if (!symbol) {
      setSymbol('AAPL');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [dataRes, summaryRes] = await Promise.all([
          getStockData(symbol),
          getStockSummary(symbol)
        ]);
        setStockData(dataRes);
        setSummary(summaryRes);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch stock data. Please check backend connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [symbol]);

  useEffect(() => {
    if (!symbol || !compareSymbol || symbol === compareSymbol) {
        setCompareData(null);
        return;
    }

    const fetchCompare = async () => {
      try {
        const data = await getCompareData(symbol, compareSymbol);
        setCompareData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCompare();
  }, [symbol, compareSymbol]);

  // Compute trend locally
  const trendText = summary?.daily_return > 0 ? "Uptrend" : summary?.daily_return < 0 ? "Downtrend" : "Flat";

  return (
    <div className="dashboard">
      <div className="controls-section">
        <StockSelector 
          label="Primary Symbol" 
          selectedSymbol={symbol} 
          onSymbolChange={setSymbol} 
        />
        <StockSelector 
          label="Compare With" 
          selectedSymbol={compareSymbol} 
          onSymbolChange={setCompareSymbol} 
        />
      </div>

      {loading && <div className="loading">Gathering market data...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && summary && stockData && (
        <div className="dashboard-content">
          <div className="metrics-row">
            <MetricsCard label="Current Price" value={summary.current_price} prefix="$" />
            <MetricsCard label="Daily Change" value={summary.daily_return} isPercentage={true} />
            <MetricsCard label="Volume" value={summary.volume} />
            <MetricsCard label="Trend" value={trendText} />
            <MetricsCard label="Sentiment" value={summary.sentiment} />
            <MetricsCard label="Volatility Score" value={summary.volatility_score} />
          </div>

          <div className="main-section">
            <div className="left-panel">
              <StockChart data={stockData} />
            </div>
            <div className="right-panel">
              <SummaryCard summary={summary} />
              <InsightBox summary={summary} />
            </div>
          </div>

          {compareData && compareSymbol && (
            <div className="charts-section compare-section">
               <CompareChart data={compareData} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
