import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Grafico from './Grafico.jsx';

function App() {
  const [datos, setDatos] = useState({
    temperatura: null,
    temperaturaDS: null,
    humedad: null
  });

  const [labels, setLabels] = useState([]);
  const [dataTempDHT, setDataTempDHT] = useState([]);
  const [dataTempDS, setDataTempDS] = useState([]);
  const [dataHum, setDataHum] = useState([]);

  const url = 'https://estacion-metereologica-cajica-default-rtdb.firebaseio.com/datos.json';

  const obtenerDatos = async () => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      if (!data) return;

      setDatos({
        temperatura: data.temperatura_dht11,
        temperaturaDS: data.temperatura_ds18b20,
        humedad: data.humedad
      });

      const hora = new Date().toLocaleTimeString();
      setLabels((prev) => [...prev.slice(-9), hora]);
      setDataTempDHT((prev) => [...prev.slice(-9), data.temperatura_dht11]);
      setDataTempDS((prev) => [...prev.slice(-9), data.temperatura_ds18b20]);
      setDataHum((prev) => [...prev.slice(-9), data.humedad]);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  useEffect(() => {
    obtenerDatos();
    const interval = setInterval(obtenerDatos, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1>Estación Meteorológica Cajica - Capellania</h1>

      <div className="card-container">
        <div className="card">
          <h2>{datos.temperatura ?? '---'}°C</h2>
          <p>Temperatura Interna</p>
        </div>
        <div className="card">
          <h2>{datos.temperaturaDS ?? '---'}°C</h2>
          <p>Temperatura Ambiente</p>
        </div>
        <div className="card">
          <h2>{datos.humedad ?? '---'}%</h2>
          <p>Humedad Interna</p>
        </div>
      </div>

      <div className="chart-wrapper">
        <Grafico
          labels={labels}
          dataTemp={dataTempDHT}
          dataTempDS={dataTempDS}
          dataHum={dataHum}
        />
      </div>
    </div>
  );
}

export default App;