import axios from "axios";
import App from "../App";

const API_URL = "https://localhost:5001/api/auth/";

export const register = (email: string, password: string, role: string) => {
  return axios.post(API_URL + "register", {
    email,
    password,
    role,
  });
};

export const login = (email: string, password: string) => {
  return axios.post(API_URL + "login", {
    email,
    password,
  });
};
