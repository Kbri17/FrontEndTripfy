
import axios from "axios";

const api = axios.create({
  baseURL: "/api", // Vite redirige automáticamente a la API en AWS
  headers: {
    "Content-Type": "application/json",
  },
});

const requestGenerico = {
  get: (url) => api.get(url).then((res) => res.data).catch(handleError),
  post: (url, body) => api.post(url, body).then((res) => res.data).catch(handleError),
  put: (url, body) => api.put(url, body).then((res) => res.data).catch(handleError),
  delete: (url) => api.delete(url).then((res) => res.data).catch(handleError),
};

// Manejo de errores centralizado
const handleError = (error) => {
  console.error("Error en la petición:", error.response?.data || error.message);
  return null; // Puedes manejar mejor los errores según lo que necesites
};

export default requestGenerico;