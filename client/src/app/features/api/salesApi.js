import config from "@/actions/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const salesApi = createApi({
  reducerPath: "salesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config?.base_url,
    credentials: "include",
  }),
  tagTypes: ["Sales"],
  endpoints: (builder) => ({
    getSales: builder.query({ query: () => "/sales", providesTags: ["Sales"] }),
    getSaleById: builder.query({
      query: (id) => `/sales/${id}`,
      providesTags: ["Sales"],
    }),
    getPrice: builder.query({
      query: () => "/sales/get-price",
      providesTags: ["Sales"],
    }),
    createSale: builder.mutation({
      query: (newSale) => ({ url: "/sales", method: "POST", body: newSale }),
      invalidatesTags: ["Sales"],
    }),
    updateSale: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/sales/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Sales"],
    }),
    deleteSale: builder.mutation({
      query: (id) => ({ url: `/sales/${id}`, method: "DELETE" }),
      invalidatesTags: ["Sales"],
    }),
    createBulkSales: builder.mutation({
      query: (bulkData) => ({
        url: "/sales/bulk",
        method: "POST",
        body: bulkData,
      }),
      invalidatesTags: ["Sales"],
    }),
    getSalesSummary: builder.query({
      query: () => "/sales/summary",
      providesTags: ["Sales"],
    }),
    getSalesByCustomer: builder.query({
      query: (customerId) => `/sales/customer/${customerId}`,
      providesTags: ["Sales"],
    }),
    getSalesByProduct: builder.query({
      query: (productId) => `/sales/product/${productId}`,
      providesTags: ["Sales"],
    }),
    searchSales: builder.query({
      query: (params) => ({ url: "/sales/search", params }),
      providesTags: ["Sales"],
    }),
  }),
});

export const {
  useGetSalesQuery,
  useGetSaleByIdQuery,
  useGetPriceQuery,
  useCreateSaleMutation,
  useUpdateSaleMutation,
  useDeleteSaleMutation,
  useCreateBulkSalesMutation,
  useGetSalesSummaryQuery,
  useGetSalesByCustomerQuery,
  useGetSalesByProductQuery,
  useSearchSalesQuery,
} = salesApi;
