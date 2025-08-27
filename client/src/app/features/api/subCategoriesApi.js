import config from "@/actions/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subCategoryApi = createApi({
  reducerPath: "subCategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config?.base_url,
    credentials: "include",
  }),
  tagTypes: ["SubCategories"],
  endpoints: (builder) => ({
    // ✅ Get all sub-categories
    getSubCategories: builder.query({
      query: () => "/categories/sub-categories",
      providesTags: ["SubCategories"],
    }),

    // ✅ Get sub-category by ID
    getSubCategoryById: builder.query({
      query: (id) => `/categories/sub-categories/${id}`,
      providesTags: ["SubCategories"],
    }),

    // ✅ Create sub-category
    createSubCategory: builder.mutation({
      query: (newSubCategory) => ({
        url: "/categories/sub-categories",
        method: "POST",
        body: newSubCategory,
      }),
      invalidatesTags: ["SubCategories"],
    }),

    // ✅ Update sub-category
    updateSubCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/categories/sub-categories/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["SubCategories"],
    }),

    // ✅ Delete sub-category
    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/sub-categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubCategories"],
    }),
  }),
});

export const {
  useGetSubCategoriesQuery,
  useGetSubCategoryByIdQuery,
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subCategoryApi;
