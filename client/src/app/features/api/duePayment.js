import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@/actions/config";

export const duePaymentApi = createApi({
  reducerPath: "duePaymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config?.base_url,
    credentials: "include",
  }),
  tagTypes: ["DuePayments"],
  endpoints: (builder) => ({
    createSalesDuePayment: builder.mutation({
      query: (data) => ({
        url: "/sales/due/create-payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DuePayments"],
    }),
    createPurchaseDuePayment: builder.mutation({
      query: (data) => ({
        url: "/purchases/due/create-payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DuePayments"],
    }),
  }),
});
export const {
  useCreateSalesDuePaymentMutation,
  useCreatePurchaseDuePaymentMutation,
} = duePaymentApi;
