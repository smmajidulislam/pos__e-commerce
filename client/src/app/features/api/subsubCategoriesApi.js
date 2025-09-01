import config from "@/actions/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subSubCategoryApi = createApi({
  reducerPath: "subSubCategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config?.base_url,
    credentials: "include",
  }),
  tagTypes: ["SubSubCategories"],
  endpoints: (builder) => ({
    // ✅ Get all sub-sub-categories
    getSubSubCategories: builder.query({
      query: () => "/categories/sub-sub-categories",
      providesTags: ["SubSubCategories"],
    }),

    // ✅ Get sub-sub-category by ID
    getSubSubCategoryById: builder.query({
      query: (id) => `/categories/sub-sub-categories/${id}`,
      providesTags: ["SubSubCategories"],
    }),

    // ✅ Create new sub-sub-category
    createSubSubCategory: builder.mutation({
      query: (newSubSubCategory) => ({
        url: "/categories/sub-sub-categories",
        method: "POST",
        body: newSubSubCategory,
      }),
      invalidatesTags: ["SubSubCategories"],
    }),

    // ✅ Update sub-sub-category
    updateSubSubCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/categories/sub-sub-categories/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["SubSubCategories"],
    }),

    // ✅ Delete sub-sub-category
    deleteSubSubCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/sub-sub-categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubSubCategories"],
    }),
  }),
});

export const {
  useGetSubSubCategoriesQuery,
  useGetSubSubCategoryByIdQuery,
  useCreateSubSubCategoryMutation,
  useUpdateSubSubCategoryMutation,
  useDeleteSubSubCategoryMutation,
} = subSubCategoryApi;
