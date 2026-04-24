import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get list of companies
export const getCompanies = async () => {
  const response = await api.get('/api/stocks/companies');
  return response.data;
};

// Get stock data
export const getStockData = async (symbol) => {
  const response = await api.get(`/api/stocks/data/${symbol}`);
  return response.data;
};

// Get summary
export const getStockSummary = async (symbol) => {
  const response = await api.get(`/api/stocks/summary/${symbol}`);
  return response.data;
};

// Compare stocks
export const getCompareData = async (symbol1, symbol2) => {
  const response = await api.get(
    `/api/stocks/compare?symbol1=${symbol1}&symbol2=${symbol2}`
  );
  return response.data;
};