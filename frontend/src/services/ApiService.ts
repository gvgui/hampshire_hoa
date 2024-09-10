import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getFiles = async () => {
  const response = await api.get('/files');
  return response.data;
};


