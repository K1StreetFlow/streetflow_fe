import axios from "axios";

const API_URL = "http://localhost:8000/api/payments"; // Ganti dengan URL API yang sesuai

export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
