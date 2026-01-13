export interface ProductReq {
  name: string;
  description?: string;
  categoryId: number;
  stock: number;
  price: number;
}

export interface ProductResponse {
  productId: number;
  name: string;
  description?: string;
  categoryName: string;
  stock: number;
  price: number;
}

export interface ApiResponse<T> {
  statusCode: number;
  payload: T;
  correlationId: string;
  timestamp: string;
  errors?: string[];
}
