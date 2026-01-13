// src/features/products/product.slice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductResponse } from "./product.types";

interface ProductState {
  items: ProductResponse[];
  selected?: ProductResponse;
  loading: boolean;
  error?: string;
}

const initialState: ProductState = {
  items: [],
  selected: undefined,
  loading: false
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // -------- LIST --------
    fetchProductsRequest(state) {
      state.loading = true;
      state.error = undefined;
    },
    fetchProductsSuccess(state, action: PayloadAction<ProductResponse[]>) {
      state.items = action.payload;
      state.loading = false;
    },
    fetchProductsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // -------- DETAILS --------
    fetchProductByIdRequest(state, _action: PayloadAction<number>) {
      state.loading = true;
      state.error = undefined;
    },
    fetchProductByIdSuccess(state, action: PayloadAction<ProductResponse>) {
      state.selected = action.payload;
      state.loading = false;
    },
    fetchProductByIdFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // -------- CLEANUP --------
    clearSelectedProduct(state) {
      state.selected = undefined;
    }
  }
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductByIdRequest,
  fetchProductByIdSuccess,
  fetchProductByIdFailure,
  clearSelectedProduct
} = productSlice.actions;

export default productSlice.reducer;
