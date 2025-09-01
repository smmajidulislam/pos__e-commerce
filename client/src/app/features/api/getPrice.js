import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@/actions/config";

export const priceApi = createApi({
  reducerPath: "priceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config?.base_url,
    credentials: "include",
  }),
  tagTypes: ["Prices"],
  endpoints: (builder) => ({
    updatePrice: builder.mutation({
      query: (data) => ({
        url: "/sales/get-price",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Prices"],
    }),
  }),
});

export const { useUpdatePriceMutation } = priceApi;
