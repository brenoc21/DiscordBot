import axios from "axios";

const riotApi = axios.create({
  baseURL: "https://ddragon.leagueoflegends.com/cdn/13.4.1/data/en_US",
});
export default api;