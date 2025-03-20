import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL;


const api = axios.create({
  baseURL: BASE_URL,
});
const requestGenerico = {
  get: (url) => api.get(url).then((res) => res.data),
  post: (url, body) => api.post(url, body).then((res) => res.data),
  put: (url, body) => api.put(url, body).then((res) => res.data),
  delete: (url) => api.delete(url).then((res) => res.data),
};

export default requestGenerico;

