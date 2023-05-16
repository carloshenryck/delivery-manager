import axios from 'axios';

const HOST = process.env.API_HOST || 'localhost';
const PROTOCOL = process.env.API_PROTOCOL || 'http';

console.log(HOST, PROTOCOL);
console.log(process.env.API_HOST, process.env.API_PROTOCOL);

const api = axios.create({
  baseURL: `${PROTOCOL}://${HOST}:${process.env.API_HOST ? '' : '3001'}`,
});

export default api;
