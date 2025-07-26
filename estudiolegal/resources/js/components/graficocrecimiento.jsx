import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const GraficoCrecimiento = () => {
  const data = {
    labels: ['Mes 1','Mes 2','Mes 3'],
    datasets: [
      {
        label: 'Crecimiento Mensual',
        data: [150,125,147],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        barThickness: 80,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false, },
    },
    scales: {
        x: {
            display:false
        }
    }
  };

  return <Bar data={data} options={options} />;
};

export default GraficoCrecimiento;
