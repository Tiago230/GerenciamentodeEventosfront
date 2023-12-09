// components/EventList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4002/eventos').then((response) => {
      setEvents(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Event List</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
