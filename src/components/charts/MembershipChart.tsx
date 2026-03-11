'use client';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MembershipChart() {
  const data = {
    labels: ['Starter', 'Pro', 'Elite', 'Expired'],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: [
          'rgba(0, 212, 255, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(107, 114, 128, 0.8)',
        ],
        borderColor: ['#00d4ff', '#ef4444', '#a855f7', '#6b7280'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { color: '#9ca3af', padding: 16 },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
}
