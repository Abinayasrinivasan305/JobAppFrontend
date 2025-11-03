import axios from "axios";
import { toast } from "react-toastify";
import { showLoader, hideLoader } from "../utils/loaderUtils";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // uses your .env backend URL
  withCredentials: false, // since JWT is in header, not cookies
});

// Request interceptor to attach token dynamically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    showLoader();
    return config;
  },
  (error) => {
    hideLoader();
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    hideLoader();
    return response;
  },
  (error) => {
    hideLoader();
    if (error.response?.status === 401) {
      toast.error("Unauthorized! Please login again.");
      localStorage.clear();
      window.location.href = "/login";
    } else {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
    return Promise.reject(error);
  }
);

export default api;
