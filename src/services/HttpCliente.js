import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

const requestGenerico = {
  get: (url) => axios.get(url).then((res) => res.data),
  post: (url, body) => axios.post(url, body).then((res) => res.data),
  put: (url, body) => axios.put(url, body).then((res) => res.data),
  delete: (url) => axios.delete(url).then((res) => res.data),
};

export default requestGenerico;
