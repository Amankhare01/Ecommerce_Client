import axios from 'axios';

export const API_BASE = process.env.REACT_APP_API || 'http://localhost:8080';

const instance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const authData = localStorage.getItem('auth');
  if (authData) {
    try {
      const parseData = JSON.parse(authData);
      if (parseData?.token) {
        const token = parseData.token;
        config.headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
      }
    } catch (err) {
      console.error('Failed to parse auth token', err);
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('auth');
      window.dispatchEvent(new Event('auth-logout'));
    }
    return Promise.reject(error);
  }
);

export default instance;
