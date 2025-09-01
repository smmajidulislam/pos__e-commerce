import config from "@/actions/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const returnProductApi = createApi({
  reducerPath: "returnProductApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config?.base_url,
    credentials: "include",
  }),
  tagTypes: ["Returns"],
  endpoints: (builder) => ({
    // Create Return Sales
    createReturnSales: builder.mutation({
      query: (data) => ({
        url: "/sales/return-sales",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Returns"],
    }),

    // Create Return Purchase
    createReturnPurchase: builder.mutation({
      query: (data) => ({
        url: "/purchases/return-purchase",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Returns"],
    }),
  }),
});

export const { useCreateReturnSalesMutation, useCreateReturnPurchaseMutation } =
  returnProductApi;
