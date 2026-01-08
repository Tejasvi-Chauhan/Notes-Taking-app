import axios from "axios";

 

const api = axios.create({
  baseURL: "https://notes-taking-app-ejkn.onrender.com",
  withCredentials: true,
});

export default api;
