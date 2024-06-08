import axios from "axios";

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

export const getUserProfile = (userId: string) => {
  return axios.get(`${API_URL}GetUserProfile`, {
    params: {
      userId,
    },
  });
};

export const updateProfile = (profileData: any) => {
  return axios.post(`${API_URL}UpdateProfile`, profileData);
};
