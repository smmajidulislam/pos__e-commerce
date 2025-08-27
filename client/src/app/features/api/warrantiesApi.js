import config from "@/actions/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const warrantyApi = createApi({
  reducerPath: "warrantyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config?.base_url,
    credentials: "include",
  }),
  tagTypes: ["Warranties"],
  endpoints: (builder) => ({
    getWarranties: builder.query({
      query: () => "/warranties",
      providesTags: ["Warranties"],
    }),
    getWarrantyById: builder.query({
      query: (id) => `/warranties/${id}`,
      providesTags: ["Warranties"],
    }),
    createWarranty: builder.mutation({
      query: (data) => ({ url: "/warranties", method: "POST", body: data }),
      invalidatesTags: ["Warranties"],
    }),
    updateWarranty: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/warranties/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Warranties"],
    }),
    deleteWarranty: builder.mutation({
      query: (id) => ({ url: `/warranties/${id}`, method: "DELETE" }),
      invalidatesTags: ["Warranties"],
    }),
  }),
});

export const {
  useGetWarrantiesQuery,
  useGetWarrantyByIdQuery,
  useCreateWarrantyMutation,
  useUpdateWarrantyMutation,
  useDeleteWarrantyMutation,
} = warrantyApi;
