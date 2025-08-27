import { configureStore } from "@reduxjs/toolkit";

// Import all APIs
import { userApi } from "../features/api/userApi";
import { productApi } from "../features/api/productApi";
import { categoryApi } from "../features/api/categoryApi";
import { productImageApi } from "../features/api/productImageApi";
import { brandApi } from "../features/api/brandApi";
import { attributeApi } from "../features/api/attributeApi";
import { storeApi } from "../features/api/storeApi";
import { warehouseApi } from "../features/api/warehouseApi";
import { couponsApi } from "../features/api/couponsApi";
import { subCategoryApi } from "../features/api/subCategoriesApi";
import { subSubCategoryApi } from "../features/api/subsubCategoriesApi";
import { supplierApi } from "../features/api/supplierApi";
import { expenseApi } from "../features/api/expenseApi";
import { salesApi } from "../features/api/salesApi";
import { customerApi } from "../features/api/customersApi";
import { warrantyApi } from "../features/api/warrantiesApi";
import { purchaseApi } from "../features/api/purchasesApi";

export const store = configureStore({
  reducer: {
    // API reducers
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productImageApi.reducerPath]: productImageApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [attributeApi.reducerPath]: attributeApi.reducer,
    [storeApi.reducerPath]: storeApi.reducer,
    [warehouseApi.reducerPath]: warehouseApi.reducer,
    [couponsApi.reducerPath]: couponsApi.reducer,
    [subCategoryApi.reducerPath]: subCategoryApi.reducer,
    [subSubCategoryApi.reducerPath]: subSubCategoryApi.reducer,
    [supplierApi.reducerPath]: supplierApi.reducer,
    [expenseApi.reducerPath]: expenseApi.reducer,
    [salesApi.reducerPath]: salesApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [warrantyApi.reducerPath]: warrantyApi.reducer,
    [purchaseApi.reducerPath]: purchaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userApi.middleware,
      productApi.middleware,
      categoryApi.middleware,
      productImageApi.middleware,
      brandApi.middleware,
      attributeApi.middleware,
      storeApi.middleware,
      warehouseApi.middleware,
      couponsApi.middleware,
      subCategoryApi.middleware,
      subSubCategoryApi.middleware,
      supplierApi.middleware,
      expenseApi.middleware,
      salesApi.middleware,
      customerApi.middleware,
      warrantyApi.middleware,
      purchaseApi.middleware,
    ]),
});
