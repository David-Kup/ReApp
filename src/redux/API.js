import axios from "axios";
// import AsyncStorage from '@react-native-community/async-storage';
import { API_BASE } from "../config";

const API = axios.create({
  baseURL: API_BASE,
  withToken: true,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  if (config.withToken) {
    const token = localStorage.token || sessionStorage.token;
    if (token) {
      config.headers.Authorization = `Bearer ${
        localStorage.token || sessionStorage.token
      }`;
    }
  }

  return config;
});

export default API;
