import config from "@/actions/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const supplierApi = createApi({
  reducerPath: "supplierApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config?.base_url,
    credentials: "include",
  }),
  tagTypes: ["Suppliers"],
  endpoints: (builder) => ({
    // Get all suppliers
    getSuppliers: builder.query({
      query: () => "/suppliers",
      providesTags: ["Suppliers"],
    }),
    // Get supplier by ID
    getSupplierById: builder.query({
      query: (id) => `/suppliers/${id}`,
      providesTags: ["Suppliers"],
    }),
    // Create new supplier
    createSupplier: builder.mutation({
      query: (newSupplier) => ({
        url: "/suppliers",
        method: "POST",
        body: newSupplier,
      }),
      invalidatesTags: ["Suppliers"],
    }),
    // Update supplier
    updateSupplier: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/suppliers/${id}`,
        method: "PATCH", // তোমার route অনুযায়ী PATCH করা হলো
        body: data,
      }),
      invalidatesTags: ["Suppliers"],
    }),
    // Delete supplier
    deleteSupplier: builder.mutation({
      query: (id) => ({
        url: `/suppliers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Suppliers"],
    }),
  }),
});

export const {
  useGetSuppliersQuery,
  useGetSupplierByIdQuery,
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
} = supplierApi;
