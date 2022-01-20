import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/";

const getPublicContent = () => {
  return axios.get(API_URL);
};

const getUserProfile = () => {
  return axios.get(API_URL + "profile", { headers: authHeader() });
};

const getAdminDashboard = () => {
  return axios.get(API_URL + "dashboard", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserProfile,
  getAdminDashboard
};