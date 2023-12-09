import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // Verifica se o eventId é uma string válida antes de fazer a solicitação
        // if (!eventId || eventId === 'undefined') {
        //   console.error('ID do evento não fornecido');
        //   return;
        // }

        // Faz a solicitação para obter detalhes do evento com o ID fornecido
        const response = await axios.get(`http://localhost:4002/eventos/`);

        // Define os detalhes do evento no estado
        setEventDetails(response.data);
      } catch (error) {
        console.error('Erro ao obter detalhes do evento:', error);
        // Trata os erros conforme necessário
      }
    };

    // Chama a função para buscar detalhes do evento quando o componente montar
    fetchEventDetails();
  }, [eventId]);

  if (!eventDetails) {
    return <div>Carregando detalhes do evento...</div>;
  }

  return (
    <div>
      <h1>Detalhes do Evento</h1>
      <p>Nome: {eventDetails.nome}</p>
      <p>Data: {eventDetails.data}</p>
      <p>Descrição: {eventDetails.descricao}</p>
      {/* Adicione mais informações conforme necessário */}
      <p>Local: {eventDetails.local}</p>
      <p>Categoria: {eventDetails.categoria}</p>
    </div>
  );
};

export default EventDetailsPage;
