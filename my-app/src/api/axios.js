import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // your backend API
  withCredentials: true,
});

export default api;