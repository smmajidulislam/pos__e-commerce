import config from "@/actions/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const warehouseApi = createApi({
  reducerPath: "warehouseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config?.base_url,
    credentials: "include",
  }),
  tagTypes: ["Warehouses"],
  endpoints: (builder) => ({
    getWarehouses: builder.query({
      query: () => "/warehouses",
      providesTags: ["Warehouses"],
    }),
    getWarehouseById: builder.query({
      query: (id) => `/warehouses/${id}`,
      providesTags: ["Warehouses"],
    }),
    createWarehouse: builder.mutation({
      query: (newWarehouse) => ({
        url: "/warehouses",
        method: "POST",
        body: newWarehouse,
      }),
      invalidatesTags: ["Warehouses"],
    }),
    updateWarehouse: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/warehouses/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Warehouses"],
    }),
    deleteWarehouse: builder.mutation({
      query: (id) => ({
        url: `/warehouses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Warehouses"],
    }),
  }),
});

export const {
  useGetWarehousesQuery,
  useGetWarehouseByIdQuery,
  useCreateWarehouseMutation,
  useUpdateWarehouseMutation,
  useDeleteWarehouseMutation,
} = warehouseApi;
