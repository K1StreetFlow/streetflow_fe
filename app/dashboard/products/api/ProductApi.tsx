// utils/api.ts
import axios, { AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:8000/api";

export const getAllProducts = async (page: number = 1): Promise<AxiosResponse> => {
  return await axios.get(`${API_BASE_URL}/products?page=${page}`, { withCredentials: true });
};

export const getProductById = async (id: number): Promise<AxiosResponse> => {
  return await axios.get(`${API_BASE_URL}/products/${id}`, { withCredentials: true });
};

export const addProduct = async (data: any): Promise<AxiosResponse> => {
  return await axios.post(`${API_BASE_URL}/products`, data, { withCredentials: true });
};

export const editProduct = async (id: number, data: any): Promise<AxiosResponse> => {
  return await axios.put(`${API_BASE_URL}/products/${id}`, data, { withCredentials: true });
};

export const deleteProduct = async (id: number): Promise<AxiosResponse> => {
  return await axios.delete(`${API_BASE_URL}/products/${id}`, { withCredentials: true });
};

export const getProductsByCategory = async (categoryId: number): Promise<AxiosResponse> => {
  return await axios.get(`${API_BASE_URL}/products/category/${categoryId}`, { withCredentials: true });
};
