import { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import './App.css'

function App() {
  const [events, setEvents] = useState<any[]>([]);

  const [customerId, setCustomerId] = useState('C-1234');
  const [planId, setPlanId] = useState('FLOW-FULL');
  const [simulateFailure, setSimulateFailure] = useState('none');

  useEffect(() => {
    const socket = io('http://localhost:3000'); 
    
    socket.on('activation_event', (eventData) => {
      console.log("Nuevo evento recibido por WS:", eventData);
      setEvents((prev) => [...prev, eventData]);
    });

    return () => { socket.disconnect(); };
  }, []);

  const handleCreateActivation = async () => {
    try {
      const response = await fetch('http://localhost:3000/activations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, planId, simulateFailure })
      });
      if (!response.ok) {
        console.error('Error al crear activación');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>POC Activación Kafka</h1>
      
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h3>Nueva Activación</h3>
        <label>
          Customer ID: <input value={customerId} onChange={e => setCustomerId(e.target.value)} />
        </label>
        <br/><br/>
        <label>
          Plan ID: <input value={planId} onChange={e => setPlanId(e.target.value)} />
        </label>
        <br/><br/>
        <label>
          Simular Fallo: 
          <select value={simulateFailure} onChange={e => setSimulateFailure(e.target.value)}>
            <option value="none">Ninguno (Camino Feliz)</option>
            <option value="billing">Fallo en Billing</option>
            <option value="provisioning">Fallo en Provisioning</option>
          </select>
        </label>
        <br/><br/>
        <button onClick={handleCreateActivation} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Contratar Plan
        </button>
      </div>

      <h2>Timeline en vivo:</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {events.map((ev, i) => {
          const isError = ev.eventType.includes('Failed');
          const isSuccess = ev.eventType === 'ActivationCompleted';
          const color = isError ? 'red' : (isSuccess ? 'green' : 'black');
          
          return (
            <li key={i} style={{ padding: '10px', marginBottom: '5px', borderLeft: `5px solid ${color}`, backgroundColor: '#f9f9f9' }}>
              <strong>{ev.eventType}</strong> - {ev.correlationId} <br/>
              <small>{new Date().toISOString()}</small>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App
