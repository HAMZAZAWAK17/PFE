import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

axiosClient.interceptors.request.use((config)=>{
  const token = localStorage.getItem('token');
  config.headers.Authorization = `bearer ${token}`
  return config;
})



