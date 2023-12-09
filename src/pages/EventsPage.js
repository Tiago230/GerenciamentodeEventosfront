import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [categoria, setCategorias] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:4002/eventos');
        const resp = await axios.get('http://localhost:4002/categorias');
        let dad = resp.data;
        let dad1 = response.data;
        dad.map((element) => {
          dad.map((el) => {
            let idcategoria = el.id
            dad1.map((teste) => {
              if(teste.categoriaId == idcategoria){
                let d = JSON.stringify(el.nome);
                setCategorias(d);
              }
            });
          });
        });

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
      console.log(`http://localhost:4002/eventos?search=${searchTerm}`);
      let dados = response.data
      let filtrados = checknome(dados)
      setEvents(filtrados);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    }
  };

  function checknome(e){
    let fil = e.filter(function(e){
      return e.nome == searchTerm
    })
    return fil
  }

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
            <p>Nome: {event.nome}/<br /> Data: {event.data} / <br /> Descrição: {event.descricao}/<br />Categoria: {event.categoriaId = '1' ? 'Musica': event.categoriaId = '2' ? 'Dança': ''}</p>
          </li>
        ))}
      </ul>
      <Link to="/create-event">Criar Novo Evento</Link>
    </div>
  );
};

export default EventsPage;

