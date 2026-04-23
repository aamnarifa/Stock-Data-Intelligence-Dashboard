import React from 'react';

const SummaryCard = ({ summary }) => {
  if (!summary) return null;

  const { high_52w, low_52w, average_price } = summary;

  return (
    <div className="summary-card">
      <h3>Key Levels</h3>
      <div className="summary-list">
        <div className="summary-item">
          <span className="summary-label">52-Week High</span>
          <span className="summary-value">${high_52w.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">52-Week Low</span>
          <span className="summary-value">${low_52w.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Average Price</span>
          <span className="summary-value">${average_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
