export default requestGenerico;

import axios from "axios";

const api = axios.create({
  baseURL: "/api", // Ahora Vite redirige a tu backend
});

const requestGenerico = {
  get: (url) => api.get(url).then((res) => res.data),
  post: (url, body) => api.post(url, body).then((res) => res.data),
  put: (url, body) => api.put(url, body).then((res) => res.data),
  delete: (url) => api.delete(url).then((res) => res.data),
};

export const getTours = async () => {
  try {
    const response = await api.get("/tour/buscartodos");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los tours:", error);
    return null;
  }
};