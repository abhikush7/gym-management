'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const attendanceData = [45, 52, 48, 61, 55, 70, 38];

export default function AttendanceChart() {
  const data = {
    labels: days,
    datasets: [
      {
        data: attendanceData,
        borderColor: '#00d4ff',
        backgroundColor: 'rgba(0, 212, 255, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#00d4ff',
        pointBorderColor: '#000',
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { color: '#1f1f1f' },
        ticks: { color: '#9ca3af' },
      },
      y: {
        grid: { color: '#1f1f1f' },
        ticks: { color: '#9ca3af' },
      },
    },
  };

  return <Line data={data} options={options} />;
}
