import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // FastAPI default URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCompanies = async () => {
  const response = await api.get('/stocks/companies');
  return response.data;
};

export const getStockData = async (symbol) => {
  const response = await api.get(`/stocks/data/${symbol}`);
  return response.data;
};

export const getStockSummary = async (symbol) => {
  const response = await api.get(`/stocks/summary/${symbol}`);
  return response.data;
};

export const getCompareData = async (symbol1, symbol2) => {
  const response = await api.get(`/stocks/compare?symbol1=${symbol1}&symbol2=${symbol2}`);
  return response.data;
};
