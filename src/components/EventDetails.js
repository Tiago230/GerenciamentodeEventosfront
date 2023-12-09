// components/EventDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4002/eventos/${id}`).then((response) => {
      setEvent(response.data);
    });
  }, [id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{event.nome}</h2>
      <p>Date: {new Date(event.data).toLocaleDateString()}</p>
      <p>Description: {event.descricao}</p>
      <p>Category: {event.categoria.nome}</p>
      <p>Location: {event.local.nome}</p>
      {/* Adicionar outras informações do evento conforme necessário */}
    </div>
  );
};

export default EventDetails;
