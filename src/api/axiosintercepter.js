import axios from "axios";
const baseURL = import.meta.env.VITE_APP_AWS_API_URL;
const axiosInstance = axios.create({
  baseURL: baseURL,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("4ZbFyHHg8uVrN5mP9kL3JhH7");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
