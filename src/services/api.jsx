import axios from "axios";
import { toast } from "react-toastify";
import { showLoader, hideLoader } from "../utils/loaderUtils";

const api = axios.create({
  baseURL: "https://jobappbacckend-3.onrender.com/", // your backend base URL
  // do NOT set Authorization here
  withCredentials: false, // true only if backend uses cookies
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
