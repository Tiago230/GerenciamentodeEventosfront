// components/EventForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    data: '',
    descricao: '',
    categoriaId: '',
    localId: '',
  });

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  // Buscar categorias e locais ao montar o componente
  useEffect(() => {
    axios.get('http://localhost:4002/categorias').then((response) => {
      setCategories(response.data);
    });

    axios.get('http://localhost:4002/locais').then((response) => {
      setLocations(response.data);
    });
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4002/eventos', formData);
      console.log(response.data); // Pode redirecionar ou exibir mensagem de sucesso
    } catch (error) {
      console.error('Erro ao cadastrar evento:', error);
    }
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Event Name:
          <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} />
        </label>

        <label>
          Date:
          <input type="date" name="data" value={formData.data} onChange={handleInputChange} />
        </label>

        <label>
          Description:
          <textarea name="descricao" value={formData.descricao} onChange={handleInputChange} />
        </label>

        <label>
          Category:
          <select name="categoriaId" value={formData.categoriaId} onChange={handleInputChange}>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nome}
              </option>
            ))}
          </select>
        </label>

        <label>
          Location:
          <select name="localId" value={formData.localId} onChange={handleInputChange}>
            <option value="">Select Location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.nome}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EventForm;
