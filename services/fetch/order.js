import { instance } from "../axios/api";

export const getOrders = async () => {
	try {
		const response = await instance.get("/order");
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Something went wrong");
	}
};

export const getOrder = async (id) => {
	try {
		const response = await instance.get(`/order/${id}`);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Something went wrong");
	}
};

export const createOrder = async (data) => {
	try {
		const response = await instance.post("/order", data, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Something went wrong");
	}
};

export const updateOrder = async (id, data) => {
	try {
		const response = await instance.put(`/order/${id}`, data);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Something went wrong");
	}
};

export const deleteOrder = async (id) => {
	try {
		const response = await instance.delete(`/order/${id}`);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message || "Something went wrong");
	}
};
