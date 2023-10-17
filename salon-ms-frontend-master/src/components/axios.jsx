import axios from 'axios';
const authToken = localStorage.getItem('authToken');
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', 
  headers: {
    Authorization: `Bearer ${authToken}`,
  },
});

export default axiosInstance;
