import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

const Grafico = ({ labels, dataTemp, dataTempDS, dataHum }) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Temperatura DHT11 (°C)',
        data: dataTemp,
        borderColor: '#007aff',
        backgroundColor: 'rgba(0,122,255,0.1)',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Temperatura DS18B20 (°C)',
        data: dataTempDS,
        borderColor: '#ff9500',
        backgroundColor: 'rgba(255,149,0,0.1)',
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

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default Grafico;