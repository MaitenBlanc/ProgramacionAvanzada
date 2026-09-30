import { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import './App.css'

function App() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    // Conexión al WebSocket del activation-api que haremos luego[cite: 8]
    const socket = io('http://localhost:3000'); 
    
    socket.on('activation_event', (eventData) => {
      console.log("Nuevo evento recibido por WS:", eventData);
      setEvents((prev) => [...prev, eventData]);
    });

    return () => { socket.disconnect(); };
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>POC Activación Kafka</h1>
      <button onClick={() => console.log('Acá haremos el POST a /activations')}>
        Contratar Plan (Camino Feliz)
      </button>
      <button onClick={() => console.log('POST a /activations con simulateFailure="billing"')}>
        Contratar Plan (Forzar fallo en Billing)
      </button>

      <h2>Timeline en vivo:</h2>
      <ul>
        {events.map((ev, i) => (
          <li key={i}>{ev.eventType} - {ev.occurredAt}</li>
        ))}
      </ul>
    </div>
  );
}

export default App
