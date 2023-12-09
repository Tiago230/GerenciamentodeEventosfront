import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventsPage from './pages/EventsPage';
import EventCreatePage from './pages/EventCreatePage';
import EventDetailsPage from './pages/EventDetailsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventsPage />} />
        <Route path="/create-event" element={<EventCreatePage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;


