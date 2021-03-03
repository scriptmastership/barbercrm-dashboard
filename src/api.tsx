import axios from 'axios';

const baseURL = process.env.REACT_APP_SERVER;
const token = localStorage.getItem('token') || '';

const api = axios.create({
  baseURL,
  headers: {
    'Authorization': 'Bearer ' + token
  }
});

api.interceptors.response.use(
  response => response,
  error => {
    const authUrls = [
      '/auth/login',
      '/auth/check'
    ];
    if (error.response && error.response.status === 401 && !authUrls.includes(error.response.config.url)) {
      window.location.href = '/login';
    }
    return error.response;
  });

export default api;