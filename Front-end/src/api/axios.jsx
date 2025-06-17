import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token'); 
      window.location.href = '/';  
    }
    return Promise.reject(error);
  }
);

export default api;