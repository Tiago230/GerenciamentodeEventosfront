// components/EventFilters.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventFilters = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    // Buscar categorias e locais da API
    axios.get('http://localhost:4002/categorias').then((response) => {
      setCategories(response.data);
    });

    axios.get('http://localhost:4002/locais').then((response) => {
      setLocations(response.data);
    });
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    // Chamar a função de filtro com a categoria selecionada
    onFilterChange({ category: event.target.value, location: selectedLocation });
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
    // Chamar a função de filtro com o local selecionado
    onFilterChange({ category: selectedCategory, location: event.target.value });
  };

  return (
    <div>
      <h2>Event Filters</h2>
      <label>
        Category:
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.nome}
            </option>
          ))}
        </select>
      </label>

      <label>
        Location:
        <select value={selectedLocation} onChange={handleLocationChange}>
          <option value="">All</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.nome}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default EventFilters;
