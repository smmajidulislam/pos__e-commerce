"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerId: null,
  products: [],
  discountType: "PERCENTAGE",
  discount: 0,
  taxType: "CASH",
  tax: 0,
  cash: 0,
};

const posSlice = createSlice({
  name: "pos",
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      state.customerId = action.payload;
    },
    addProduct: (state, action) => {
      const newProduct = action.payload;
      const existing = state.products.find(
        (p) => p.purchaseId === newProduct.purchaseId
      );
      if (existing) {
        existing.quantity += 1;
        existing.price = existing.unitPrice * existing.quantity;
        existing.salesPrice =
          existing.unitPrice * existing.quantity - existing.discount;
      } else {
        state.products.push({
          ...newProduct,
          quantity: 1,
          discountType: "PERCENTAGE",
          discount: 0,
          taxType: "CASH",
          tax: 0,
          price: newProduct.unitPrice,
          salesPrice: newProduct.unitPrice,
          due: 0,
        });
      }
    },
    updateQty: (state, action) => {
      const { purchaseId, quantity } = action.payload;
      const product = state.products.find((p) => p.purchaseId === purchaseId);
      if (product) {
        product.quantity = quantity;
        product.price = product.unitPrice * quantity;
        product.salesPrice = product.unitPrice * quantity - product.discount;
      }
    },
    updateProductDiscount: (state, action) => {
      const { purchaseId, discount, discountType } = action.payload;
      const product = state.products.find((p) => p.purchaseId === purchaseId);
      if (product) {
        product.discount = discount;
        product.discountType = discountType;
        product.salesPrice = product.unitPrice * product.quantity - discount;
      }
    },
    updateProductTax: (state, action) => {
      const { purchaseId, tax, taxType } = action.payload;
      const product = state.products.find((p) => p.purchaseId === purchaseId);
      if (product) {
        product.tax = tax;
        product.taxType = taxType;
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (p) => p.purchaseId !== action.payload
      );
    },
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
    setTax: (state, action) => {
      state.tax = action.payload;
    },
    setCash: (state, action) => {
      state.cash = action.payload;
    },
    resetOrder: () => ({ ...initialState }),
  },
});

export const {
  setCustomer,
  addProduct,
  updateQty,
  updateProductDiscount,
  updateProductTax,
  removeProduct,
  setDiscount,
  setTax,
  setCash,
  resetOrder,
} = posSlice.actions;

export default posSlice.reducer;
