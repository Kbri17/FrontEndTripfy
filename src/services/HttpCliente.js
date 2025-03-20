import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

axios.defaults.baseURL = `${apiUrl}`;

const requestGenerico = {
  get: (url) => axios.get(url).then((res) => res.data),
  post: (url, body) => axios.post(url, body).then((res) => res.data),
  put: (url, body) => axios.put(url, body).then((res) => res.data),
  delete: (url) => axios.delete(url).then((res) => res.data),
};

export default requestGenerico;

