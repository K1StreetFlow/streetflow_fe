import { instance } from "../axios/api";

export const getAllCategory = async () => {
	try {
		const response = await instance.get("/category_products");
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Something went wrong");
	}
};

export const getPagination = async () => {
	try {
		const response = await instance.get("/category_products/pagination");
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Something went wrong");
	}
};

export const getCategory = async (id) => {
	try {
		const response = await instance.get(`/category_products/${id}`);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Something went wrong");
	}
};

export const createCategory = async (data) => {
	try {
		const response = await instance.post("/category_products", data, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Something went wrong");
	}
};

export const updateCategory = async (id, data) => {
	try {
		const response = await instance.put(`/category_products/${id}`, data);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Something went wrong");
	}
};

export const deleteCategory = async (id) => {
	try {
		const response = await instance.delete(`/category_products/${id}`);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Something went wrong");
	}
};
