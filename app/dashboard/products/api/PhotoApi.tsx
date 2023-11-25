import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const getAllPhotoProducts = async (): Promise<AxiosResponse> => {
  return await axios.get(`${API_BASE_URL}/photo_products`);
};

export const getPhotoProductById = async (id: number): Promise<AxiosResponse> => {
  return await axios.get(`${API_BASE_URL}/photo_products/${id}`);
};

export const editPhotoProduct = async (id: number, data: any, photo?: File): Promise<number> => {
  try {
    // Gunakan 'FormData' yang sudah dideklarasikan
    const formData = new FormData();
    
    if (photo) {
      formData.append('photo_product', photo);
    }

    formData.append('data', JSON.stringify(data));

    const response = await axios.put(`${API_BASE_URL}/photo_products/upload/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      // Periksa apakah 'data' ada di respons sebelum mencoba mengakses 'id'
      const photoId = response.data && response.data.id;
      
      if (photoId) {
        return photoId;
      } else {
        throw new Error(`Invalid response format. Missing 'id' property.`);
      }
    } else {
      throw new Error(`Failed to edit photo. Server returned ${response.status}`);
    }
  } catch (error) {
    console.error('Error editing photo:', error);
    throw error;
  }
};




export const deletePhotoProduct = async (id: number): Promise<AxiosResponse> => {
  return await axios.delete(`${API_BASE_URL}/photo_products/${id}`);
};

// Perbarui fungsi uploadPhoto di PhotoApi.ts
export const uploadPhoto = async (photo: File): Promise<AxiosResponse> => {
  const formData = new FormData();
  formData.append('photo_product', photo);

  // Ganti URL sesuai dengan kebutuhan Anda
  return await axios.post(`${API_BASE_URL}/photo_products/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
