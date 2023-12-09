// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4002', // Certifique-se de usar a URL correta do seu backend
});

export default api;
