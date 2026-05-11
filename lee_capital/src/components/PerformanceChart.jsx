import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const PerformanceChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Lee Capital Growth Fund',
        data: [42, 48, 52, 61, 68, 74, 85, 92, 101, 115, 128, 145],
        borderColor: '#3282B8',
        backgroundColor: 'rgba(50, 130, 184, 0.05)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: '#002B5B',
        pointBorderColor: '#fff',
        borderWidth: 3,
      },
      {
        label: 'S&P 500 Benchmark',
        data: [45, 47, 49, 52, 56, 60, 66, 70, 76, 82, 88, 94],
        borderColor: '#9aaebf',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        tension: 0.2,
        pointRadius: 1,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { position: 'top', labels: { font: { family: 'Inter', size: 12 }, usePointStyle: true } },
      tooltip: { mode: 'index', intersect: false, backgroundColor: '#002B5B' },
    },
    scales: {
      y: { grid: { color: '#e5e9f0' }, title: { display: true, text: 'Portfolio Value (USD k)' } },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#3282B8]/20">
      <h3 className="text-xl font-bold text-[#002B5B] mb-4">📈 Investment Performance Trajectory</h3>
      <Line data={data} options={options} height={250} />
      <p className="text-sm text-gray-500 mt-4 text-center">*Historical simulated performance. Past results do not guarantee future returns.</p>
    </div>
  );
};

export default PerformanceChart;