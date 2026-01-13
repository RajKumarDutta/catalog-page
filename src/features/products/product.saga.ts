import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductByIdRequest,
  fetchProductByIdSuccess,
  fetchProductByIdFailure
} from "./product.slice";
import { fetchProducts, fetchProductById } from "./product.api";
import type { ProductResponse } from "./product.types";

/* -------- LIST -------- */
function* handleFetchProducts() {
  try {
    const products: ProductResponse[] = yield call(fetchProducts);
    yield put(fetchProductsSuccess(products));
  } catch (error: any) {
    yield put(fetchProductsFailure(error.message ?? "Fetch failed"));
  }
}

/* -------- DETAILS -------- */
function* handleFetchProductById(
  action: ReturnType<typeof fetchProductByIdRequest>
) {
  try {
    const product: ProductResponse = yield call(
      fetchProductById,
      action.payload
    );
    yield put(fetchProductByIdSuccess(product));
  } catch (error: any) {
    yield put(fetchProductByIdFailure(error.message ?? "Fetch failed"));
  }
}

/* -------- WATCHER -------- */
export function* productSaga() {
  yield takeLatest(fetchProductsRequest, handleFetchProducts);
  yield takeLatest(fetchProductByIdRequest, handleFetchProductById);
}
