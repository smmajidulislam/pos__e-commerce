import config from "@/actions/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config?.base_url,
    credentials: "include",
  }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/categories",
      providesTags: ["Categories"],
    }),
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/categories",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
