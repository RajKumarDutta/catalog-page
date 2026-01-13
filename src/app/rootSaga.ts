// src/app/rootSaga.ts
import { all } from "redux-saga/effects";
import { productSaga } from "../features/products/product.saga";

export default function* rootSaga() {
  yield all([productSaga()]);
}
