import axios from "axios";
// import { data } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getCategories = () => api.get("/category");
export const getCategory = (id) => api.get(`/category/${id}`);
export const createCategory = (data) => api.post("/category", data);
export const updateCategory = (id, data) => api.put(`/category/${id}`, data);
export const deleteCategory = (id) => api.delete(`/category/${id}`);

export const getProducts = () => api.get("/product");
export const getProduct = (id) => api.get(`/product/${id}`);
export const createProducts = (data) => api.post("/product", data);
export const updateProducts = (id, data) => api.put(`/product/${id}`, data);
export const deleteProducts = (id) => api.delete(`/product/${id}`);
