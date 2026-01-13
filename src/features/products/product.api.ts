// src/features/products/product.api.ts
import { api } from "../../utils/axios";
import type { ApiResponse, ProductReq, ProductResponse } from "./product.types";

export const fetchProducts = async (): Promise<ProductResponse[]> => {
  const res = await api.get<ApiResponse<ProductResponse[]>>("");
  return res.data.payload; // ✅ unwrap here
};

export const fetchProductById = async (id: number) => {
  const res = await api.get<ApiResponse<ProductResponse>>(`/${id}`);
  return res.data.payload;
};

export const createProduct = async (payload: ProductReq) => {
  const res = await api.post<ApiResponse<ProductResponse>>("/", payload);
  return res.data.payload;
};

