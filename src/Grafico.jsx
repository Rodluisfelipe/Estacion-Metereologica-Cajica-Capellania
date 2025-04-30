import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Grafico = ({ labels, dataTemp, dataHum }) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: dataTemp,
        borderColor: '#007aff',
        backgroundColor: 'rgba(0,122,255,0.1)',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Humedad (%)',
        data: dataHum,
        borderColor: '#34c759',
        backgroundColor: 'rgba(52,199,89,0.1)',
        tension: 0.3,
        fill: true,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#111',
          font: { size: 14 }
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#444' }
      },
      y: {
        ticks: { color: '#444' }
      }
    }
  };

  return <div style={{ height: '300px', width: '100%' }}><Line data={data} options={options} /></div>;
};

export default Grafico;