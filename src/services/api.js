import axios from "axios";

const api = axios.create({
  baseURL: "https://dev-fedrann-api.onrender.com",
});
export default api;