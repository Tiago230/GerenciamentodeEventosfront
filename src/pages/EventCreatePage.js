import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventCreatePage = () => {
  const [formData, setFormData] = useState({
    nome: '',
    data: '',
    descricao: '',
    categoriaId: '', // Removido valor padrão
    localId: '', // Removido valor padrão
  });

  const [categorias, setCategorias] = useState([]);
  const [locais, setLocais] = useState([]);

  useEffect(() => {
    const fetchCategoriasLocais = async () => {
      try {
        const categoriasResponse = await axios.get('http://localhost:4002/categorias');
        const locaisResponse = await axios.get('http://localhost:4002/locais');

        setCategorias(categoriasResponse.data);
        setLocais(locaisResponse.data);
      } catch (error) {
        console.error('Erro ao obter categorias e locais:', error);
      }
    };

    fetchCategoriasLocais();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4002/eventos', formData);
      // Redirecione ou faça outras ações após a criação bem-sucedida
    } catch (error) {
      console.error('Erro ao criar evento:', error);
    }
  };

  return (
    <div>
      <h1>Criar Novo Evento</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
        </label>
        <label>
          Data:
          <input type="date" name="data" value={formData.data} onChange={handleChange} />
        </label>
        <label>
          Descrição:
          <textarea name="descricao" value={formData.descricao} onChange={handleChange} />
        </label>
        <label>
          Categoria:
          <select name="categoriaId" value={formData.categoriaId} onChange={handleChange}>
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </label>
        <label>
          Local:
          <select name="localId" value={formData.localId} onChange={handleChange}>
            <option value="">Selecione um local</option>
            {locais.map((local) => (
              <option key={local.id} value={local.id}>
                {local.nome}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Criar Evento</button>
      </form>
    </div>
  );
};

export default EventCreatePage;
