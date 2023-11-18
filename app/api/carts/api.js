import axios from "axios";

const API_URL = "http://localhost:8000/api/carts"; // Ganti dengan URL API yang sesuai

export const fetchDataCart = {
  getAllData: async () => {
    const response = await axios.get(API_URL);
    const data = await response.data;

    return data;
  },
  getTotalPrice: async () => {
    const response = await axios.get(`${API_URL}/total-price/total-product`);
    const data = await response.data;

    return data;
  },
};
