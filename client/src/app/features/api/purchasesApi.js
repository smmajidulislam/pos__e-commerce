"use client";
import config from "@/actions/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config?.base_url, // তোমার base_url = http://localhost:8000/api/v1
    credentials: "include",
  }),
  tagTypes: ["Purchases"],
  endpoints: (builder) => ({
    // এখানে categoryId optional
    getPurchases: builder.query({
      query: (categoryId) =>
        categoryId ? `/purchases/category/${categoryId}` : "/purchases",
      providesTags: ["Purchases"],
    }),

    getPurchaseById: builder.query({
      query: (id) => `/purchases/${id}`,
      providesTags: ["Purchases"],
    }),

    createPurchase: builder.mutation({
      query: (data) => ({
        url: "/purchases",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Purchases"],
    }),

    updatePurchase: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/purchases/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Purchases"],
    }),

    deletePurchase: builder.mutation({
      query: (id) => ({
        url: `/purchases/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Purchases"],
    }),
  }),
});

export const {
  useGetPurchasesQuery,
  useGetPurchaseByIdQuery,
  useCreatePurchaseMutation,
  useUpdatePurchaseMutation,
  useDeletePurchaseMutation,
} = purchaseApi;
