import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PTS_BACKEND_SERVER,  
});

export default axiosInstance;