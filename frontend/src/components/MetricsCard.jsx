import React from 'react';

const MetricsCard = ({ label, value, isPercentage = false, prefix = "" }) => {
  let displayValue = value;
  let colorClass = "neutral";
  let icon = "";
  
  if (value === undefined || value === null) {
      displayValue = "N/A";
  } else {
      if (isPercentage) {
          colorClass = value > 0 ? "positive" : value < 0 ? "negative" : "neutral";
          icon = value > 0 ? "↗" : value < 0 ? "↘" : "→";
          displayValue = `${value > 0 ? '+' : ''}${value}%`;
      } else if (typeof value === "number") {
          displayValue = `${prefix}${value.toLocaleString()}`;
      } else {
          displayValue = value; // For strings like "Uptrend"
          if (typeof value === 'string') {
              if (value.includes("Uptrend") || value.includes("Low Risk") || value.includes("Bullish")) colorClass = "positive";
              else if (value.includes("Downtrend") || value.includes("High Risk") || value.includes("Bearish")) colorClass = "negative";
              else if (value.includes("Medium Risk") || value.includes("Neutral") || value === "Flat") colorClass = "warning";
          }
      }
  }

  return (
    <div className={`metric-card`}>
      <div className="metric-label">{label}</div>
      <div className={`metric-value ${colorClass}`}>
        {displayValue} {icon && <span className="metric-icon">{icon}</span>}
      </div>
    </div>
  );
};

export default MetricsCard;
