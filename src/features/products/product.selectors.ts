// src/features/products/product.selectors.ts

import type { RootState } from "../../app/store";
import type { ProductResponse } from "./product.types";

export const selectProductsState = (state: RootState) => state.products;

// -------- LIST --------
export const selectAllProducts = (state: RootState): ProductResponse[] =>
  state.products.items;

// -------- DETAILS --------
export const selectProductDetails = (
  state: RootState
): ProductResponse | undefined =>
  state.products.selected;

// -------- STATUS --------
export const selectProductsLoading = (state: RootState): boolean =>
  state.products.loading;

export const selectProductsError = (state: RootState): string | undefined =>
  state.products.error;
