import axios from "axios";

const api = axios.create({
  baseURL: "https://travel-ai-itinerary-lnit.onrender.com",
});

export default api;