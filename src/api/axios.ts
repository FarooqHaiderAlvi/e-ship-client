import axios, { type AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1", // ✅ replace with your backend URL in production
  headers: {
    // "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ include cookies if needed
});

export default axiosInstance;
