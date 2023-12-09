import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:4002/eventos');
        setEvents(response.data);
      } catch (error) {
        console.error('Erro ao obter lista de eventos:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:4002/eventos?search=${searchTerm}`);
      setEvents(response.data);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Eventos</h1>
      <input
        type="text"
        placeholder="Pesquisar eventos"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <Link to={`/events/${event.id}`}>{event.nome}</Link>
          </li>
        ))}
      </ul>
      <Link to="/create-event">Criar Novo Evento</Link>
    </div>
  );
};

export default EventsPage;

