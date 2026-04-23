import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';

const StockChart = ({ data }) => {
  const chartRef = useRef(null);
  
  if (!data || !data.history) return null;

  const labels = data.history.map(pt => pt.date);
  
  const chartData = {
    labels,
    datasets: [
      {
        label: `${data.symbol} Price`,
        data: data.history.map(pt => pt.price),
        borderColor: '#3b82f6',
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');
          return gradient;
        },
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 20,
        borderWidth: 2,
      },
      {
        label: '7-Day Moving Avg',
        data: data.moving_average?.map(pt => pt.price) || [],
        borderColor: '#f59e0b',
        borderWidth: 2,
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 20,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#94a3b8',
          font: { family: "'Outfit', sans-serif" }
        }
      },
      tooltip: {
        backgroundColor: '#1e2235',
        titleColor: '#f8fafc',
        bodyColor: '#cbd5e1',
        borderColor: '#2e364f',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#64748b', maxTicksLimit: 8 }
      },
      y: {
        grid: { color: '#2e364f' },
        border: { display: false },
        ticks: { color: '#64748b' }
      }
    }
  };

  return (
    <div className="chart-card" style={{ height: '420px', position: 'relative' }}>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default StockChart;
