import React from 'react';
import { Line } from 'react-chartjs-2';

const CompareChart = ({ data }) => {
  if (!data || !data.history1 || !data.history2) return null;

  const labels = data.history1.map(pt => pt.date);

  // Normalize data for fair comparison over the period (Percentage Change from base)
  const base1 = data.history1[0]?.price || 1;
  const base2 = data.history2[0]?.price || 1;

  const chartData = {
    labels,
    datasets: [
      {
        label: data.symbol1,
        data: data.history1.map(pt => ((pt.price - base1) / base1) * 100),
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        tension: 0.1,
        pointRadius: 0,
        pointHitRadius: 10,
      },
      {
        label: data.symbol2,
        data: data.history2.map(pt => ((pt.price - base2) / base2) * 100),
        borderColor: '#10b981',
        backgroundColor: '#10b981',
        tension: 0.1,
        pointRadius: 0,
        pointHitRadius: 10,
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
        labels: { color: '#94a3b8', font: { family: "'Outfit', sans-serif" } }
      },
      title: {
        display: true,
        text: 'Comparative Performance (% Change)',
        color: '#f8fafc',
        font: { family: "'Outfit', sans-serif", size: 16 }
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
               label += context.parsed.y.toFixed(2) + '%';
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#64748b' }
      },
      y: {
        grid: { color: '#2e364f' },
        border: { display: false },
        ticks: { color: '#64748b' }
      }
    }
  };

  return (
    <div className="chart-card" style={{ height: '400px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default CompareChart;
