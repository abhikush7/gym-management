'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
const revenueData = [85000, 92000, 110000, 98000, 125000, 138000];

export default function RevenueChart() {
  const data = {
    labels,
    datasets: [
      {
        data: revenueData,
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: '#ef4444',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: { raw: unknown }) => `₹${Number(ctx.raw).toLocaleString('en-IN')}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: '#1f1f1f' },
        ticks: { color: '#9ca3af' },
      },
      y: {
        grid: { color: '#1f1f1f' },
        ticks: {
          color: '#9ca3af',
          callback: (val: number | string) => `₹${Number(val) / 1000}k`,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}
