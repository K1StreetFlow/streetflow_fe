// utils/api.ts
import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const getAllProducts = async (): Promise<AxiosResponse> => {
  return await axios.get(`${API_BASE_URL}/products`);
};

export const getProductById = async (id: number): Promise<AxiosResponse> => {
  return await axios.get(`${API_BASE_URL}/products/${id}`);
};

export const addProduct = async (data: any): Promise<AxiosResponse> => {
  return await axios.post(`${API_BASE_URL}/products`, data);
};

export const editProduct = async (id: number, data: any): Promise<AxiosResponse> => {
  return await axios.put(`${API_BASE_URL}/products/${id}`, data);
};

export const deleteProduct = async (id: number): Promise<AxiosResponse> => {
  return await axios.delete(`${API_BASE_URL}/products/${id}`);
};
