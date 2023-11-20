import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 180_000
});

export default axiosInstance;
