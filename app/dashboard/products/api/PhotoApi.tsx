import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const getAllProducts = async (): Promise<AxiosResponse> => {
  return await axios.get(`${API_BASE_URL}/photo_products`);
};

export const getProductById = async (id: number): Promise<AxiosResponse> => {
  return await axios.get(`${API_BASE_URL}/photo_products/${id}`);
};

export const editProduct = async (id: number, data: any, photo?: File): Promise<AxiosResponse> => {
  const formData = new FormData();
  if (photo) {
    formData.append('photo_product', photo);
  }
  // You can append other fields if needed
  formData.append('data', JSON.stringify(data));

  return await axios.put(`${API_BASE_URL}/photo_products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteProduct = async (id: number): Promise<AxiosResponse> => {
  return await axios.delete(`${API_BASE_URL}/photo_products/${id}`);
};

export const uploadPhoto = async (photo: File): Promise<AxiosResponse> => {
  const formData = new FormData();
  formData.append('photo_product', photo);

  return await axios.post(`${API_BASE_URL}/photo_products/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
