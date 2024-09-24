import { AddressType } from "@/types/type";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error
    }
    return Promise.reject(error);
  }
);
export default api;

export const registerUser = async (username: string, password: string) => {
  return await api.post(`/api/users/register`, { username, password });
};

export const loginUser = async (username: string, password: string) => {
  return await api.post(`/api/users/login`, { username, password });
};

export const getAddresses = async (token: string) => {
  return await api.get(`/api/addresses`, {
    headers: { Authorization: token },
  });
};

export const createAddress = async (address: AddressType, token: string) => {
  return await api.post(`/api/addresses`, address, {
    headers: { Authorization: token },
  });
};

export const updateAddress = async (
  id: string,
  address: AddressType,
  token: string
) => {
  return await api.put(`/api/addresses/${id}`, address, {
    headers: { Authorization: token },
  });
};

export const deleteAddress = async (id: string, token: string) => {
  return await api.delete(`/api/addresses/${id}`, {
    headers: { Authorization: token },
  });
};
