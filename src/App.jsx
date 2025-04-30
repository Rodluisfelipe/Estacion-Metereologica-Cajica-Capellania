import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Grafico from './Grafico.jsx';

function App() {
  const [datos, setDatos] = useState({ temperatura: 0, humedad: 0 });
  const [labels, setLabels] = useState([]);
  const [dataTemp, setDataTemp] = useState([]);
  const [dataHum, setDataHum] = useState([]);

  const url = 'https://estacion-metereologica-cajica-default-rtdb.firebaseio.com/datos.json';

  const obtenerDatos = async () => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      if (!data) return;

      setDatos(data);
      const hora = new Date().toLocaleTimeString();

      setLabels((prev) => [...prev.slice(-9), hora]);
      setDataTemp((prev) => [...prev.slice(-9), data.temperatura]);
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

      <div className="tarjetas">
        <div className="card">
          <h2>{datos.temperatura}°C</h2>
          <p>Temperatura</p>
        </div>
        <div className="card">
          <h2>{datos.humedad}%</h2>
          <p>Humedad</p>
        </div>
      </div>

      <div className="grafico">
        <Grafico labels={labels} dataTemp={dataTemp} dataHum={dataHum} />
      </div>
    </div>
  );
}

export default App;