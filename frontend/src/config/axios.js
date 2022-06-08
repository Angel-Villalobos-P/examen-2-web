import axios from "axios";

const clienteAxtios = axios.create({
  baseURL: "http://localhost:3001/",
});

export default clienteAxtios;
