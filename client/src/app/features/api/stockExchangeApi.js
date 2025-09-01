import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@/actions/config";

export const stockExchangeApi = createApi({
  reducerPath: "stockExchangeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config?.base_url,
    credentials: "include",
  }),
  tagTypes: ["Reports"],
  endpoints: (builder) => ({
    // Monthly sales report
    createStockExchange: builder.mutation({
      query: (data) => ({
        url: `/purchases/transfer-stock`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reports"],
    }),
  }),
});

export const { useCreateStockExchangeMutation } = stockExchangeApi;
