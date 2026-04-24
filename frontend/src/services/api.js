import axios from 'axios';

const BASE_URL = "https://stock-data-intelligence-dashboard-1-dyrh.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get list of companies
export const getCompanies = async () => {
  const response = await api.get('/stocks/companies');
  return response.data;
};

// Get stock data
export const getStockData = async (symbol) => {
  const response = await api.get(`/stocks/data/${symbol}`);
  return response.data;
};

// Get summary
export const getStockSummary = async (symbol) => {
  const response = await api.get(`/stocks/summary/${symbol}`);
  return response.data;
};

// Compare stocks
export const getCompareData = async (symbol1, symbol2) => {
  const response = await api.get(
    `/stocks/compare?symbol1=${symbol1}&symbol2=${symbol2}`
  );
  return response.data;
};