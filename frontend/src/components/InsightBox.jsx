import React from 'react';

const InsightBox = ({ summary }) => {
  if (!summary) return null;

  const { daily_return, current_price, average_price, volatility } = summary;
  
  const trend = daily_return > 0 ? "Uptrend 📈" : daily_return < 0 ? "Downtrend 📉" : "Flat ➖";
  const priceVsAvg = current_price > average_price 
    ? "Price is trading above its recent average." 
    : "Price is lagging below its recent average.";
  
  let volText = "low";
  if (volatility >= 40) volText = "high";
  else if (volatility >= 20) volText = "moderate";
  
  return (
    <div className="insight-box">
      <div className="insight-header">
        <span className="insight-icon">💡</span>
        <h3>Smart Highlight</h3>
      </div>
      <p>
        The stock is currently in an <strong>{trend}</strong>. {priceVsAvg} Volatility is considered <strong>{volText}</strong> ({summary.volatility}%).
      </p>
    </div>
  );
};

export default InsightBox;
