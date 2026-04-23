import React, { useState, useEffect } from 'react';
import { getCompanies } from '../services/api';

const StockSelector = ({ selectedSymbol, onSymbolChange, label = "Select Stock" }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getCompanies();
        setCompanies(data);
      } catch (error) {
        console.error("Failed to load companies.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  if (loading) return <div className="selector-container">Loading tickers...</div>;

  return (
    <div className="selector-container">
      <label htmlFor={`stock-select-${label}`}><strong>{label}:</strong></label>
      <select 
        id={`stock-select-${label}`}
        value={selectedSymbol || ""} 
        onChange={(e) => onSymbolChange(e.target.value)}
      >
        <option value="" disabled>Select a company</option>
        {companies.map((company) => (
          <option key={company.symbol} value={company.symbol}>
            {company.symbol} - {company.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StockSelector;
