import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://httpbin.org',
  timeout: 180_000
});

export default axiosInstance;
