import axios from "axios";

const request = axios.create({
  baseURL: "http:kuanyshaptaizhanov.ru/api",
});

export default request;
