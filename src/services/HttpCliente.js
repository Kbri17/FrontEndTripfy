import axios from "axios";

axios.defaults.baseURL = "https://localhost:443";
const api = axios.create({
  baseURL: "https://localhost:443",
  headers: {
    "Content-Type": "application/json",
  },
});

const requestGenerico = {
  get: (url) => api.get(url).then((res) => res.data),
  post: (url, body) => api.post(url, body).then((res) => res.data),
  put: (url, body) => api.put(url, body).then((res) => res.data),
  delete: (url) => api.delete(url).then((res) => res.data),
};

export default requestGenerico;

