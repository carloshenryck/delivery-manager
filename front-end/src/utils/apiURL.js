import axios from 'axios';

const HOST = process.env.REACT_APP_API_HOST || 'localhost';
const PROTOCOL = process.env.REACT_APP_API_PROTOCOL || 'http';

const api = axios.create({
  baseURL: `${PROTOCOL}://${HOST}:${process.env.REACT_APP_API_HOST ? '' : '3001'}`,
});

export default api;
