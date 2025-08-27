import config from "@/actions/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config?.base_url,
    credentials: "include",
  }),
  tagTypes: ["Brands"],
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => "/brands",
      providesTags: ["Brands"],
    }),
    getBrandById: builder.query({
      query: (id) => `/brands/${id}`,
      providesTags: ["Brands"],
    }),
    createBrand: builder.mutation({
      query: (newBrand) => ({
        url: "/brands",
        method: "POST",
        body: newBrand,
      }),
      invalidatesTags: ["Brands"],
    }),
    updateBrand: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/brands/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Brands"],
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brands"],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useGetBrandByIdQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApi;
