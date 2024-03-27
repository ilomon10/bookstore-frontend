import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/server/"
});

export { axiosInstance };
