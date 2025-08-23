import config from "@/actions/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productImageApi = createApi({
  reducerPath: "productImageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config?.base_url,
    // credentials: "include",
  }),
  tagTypes: ["ProductImages"],
  endpoints: (builder) => ({
    getProductImages: builder.query({
      query: () => "/product-images",
      providesTags: ["ProductImages"],
    }),
    getProductImageById: builder.query({
      query: (id) => `/product-images/${id}`,
      providesTags: ["ProductImages"],
    }),
    getImagesByProductId: builder.query({
      query: (productId) => `/product-images/product/${productId}`,
      providesTags: ["ProductImages"],
    }),
    uploadProductImage: builder.mutation({
      query: (newImage) => ({
        url: "/product-images",
        method: "POST",
        body: newImage,
      }),
      invalidatesTags: ["ProductImages"],
    }),
    updateProductImage: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/product-images/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ProductImages"],
    }),
    deleteProductImage: builder.mutation({
      query: (id) => ({
        url: `/product-images/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProductImages"],
    }),
    replaceProductImages: builder.mutation({
      query: ({ productId, images }) => ({
        url: `/product-images/product/${productId}`,
        method: "PUT",
        body: images,
      }),
      invalidatesTags: ["ProductImages"],
    }),
    addProductImages: builder.mutation({
      query: ({ productId, images }) => ({
        url: `/product-images/product/${productId}/add`,
        method: "POST",
        body: images,
      }),
      invalidatesTags: ["ProductImages"],
    }),
    upsertProductImages: builder.mutation({
      query: ({ productId, images }) => ({
        url: `/product-images/product/${productId}`,
        method: "PATCH",
        body: images,
      }),
      invalidatesTags: ["ProductImages"],
    }),
    deleteBatchImages: builder.mutation({
      query: (ids) => ({
        url: `/product-images/batch/delete`,
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: ["ProductImages"],
    }),
    getImagesByMultipleProducts: builder.query({
      query: (productIds) => ({
        url: `/product-images/batch/product`,
        method: "GET",
        params: { ids: productIds },
      }),
      providesTags: ["ProductImages"],
    }),
  }),
});

export const {
  useGetProductImagesQuery,
  useGetProductImageByIdQuery,
  useGetImagesByProductIdQuery,
  useUploadProductImageMutation,
  useUpdateProductImageMutation,
  useDeleteProductImageMutation,
  useReplaceProductImagesMutation,
  useAddProductImagesMutation,
  useUpsertProductImagesMutation,
  useDeleteBatchImagesMutation,
  useGetImagesByMultipleProductsQuery,
} = productImageApi;
