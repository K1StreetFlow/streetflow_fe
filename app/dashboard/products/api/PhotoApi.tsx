import axios, { AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:8000/api";

export const getAllPhotoProducts = async (): Promise<AxiosResponse> => {
  return await axios.get(`${API_BASE_URL}/photo_products`, { withCredentials: true });
};

export const getProductById = async (id: number): Promise<AxiosResponse> => {
  return await axios.get(`${API_BASE_URL}/photo_products/${id}`, { withCredentials: true });
};

export const editPhotoProduct = async (id: number, data: any, photo?: File): Promise<AxiosResponse> => {
  const formData = new FormData();
  if (photo) {
    formData.append("photo_product", photo);
  }

  formData.append("data", JSON.stringify(data));

  return await axios.put(`${API_BASE_URL}/photo_products/upload/${id}`, formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deletePhotoProduct = async (id: number): Promise<AxiosResponse> => {
  return await axios.delete(`${API_BASE_URL}/photo_products/${id}`, { withCredentials: true });
};

// Perbarui fungsi uploadPhoto di PhotoApi.ts
export const uploadPhoto = async (photo: File): Promise<AxiosResponse> => {
  const formData = new FormData();
  formData.append("photo_product", photo);

  // Ganti URL sesuai dengan kebutuhan Anda
  return await axios.post(`${API_BASE_URL}/photo_products/upload`, formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
