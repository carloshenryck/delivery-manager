import axios from 'axios';

const HOST = process.env.API_HOST || 'localhost';
const PROTOCOL = process.env.API_PROTOCOL || 'http';

const api = axios.create({
  baseURL: `${PROTOCOL}://${HOST}:${process.env.API_HOST ? '' : '3001'}`,
});

export default api;
