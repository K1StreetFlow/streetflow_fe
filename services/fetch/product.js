import { instance } from "../axios/api";

export const getProducts = async () => {
	try {
		const response = await instance.get("/products");
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Something went wrong");
	}
};

export const getProduct = async (id) => {
	try {
		const response = await instance.get(`/products/${id}`);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Something went wrong");
	}
};

export const createProduct = async (data) => {
	try {
		const response = await instance.post("/products/create", data, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Something went wrong");
	}
};

export const updateProduct = async (id, data) => {
	try {
		const response = await instance.put(`/products/update/${id}`, data);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Something went wrong");
	}
};

export const deleteProduct = async (id) => {
	try {
		const response = await instance.delete(`/products/delete/${id}`);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Something went wrong");
	}
};
