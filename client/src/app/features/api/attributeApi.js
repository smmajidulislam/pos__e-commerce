import config from "@/actions/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const attributeApi = createApi({
  reducerPath: "attributeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config?.base_url,
    credentials: "include",
  }),
  tagTypes: ["Attributes"],
  endpoints: (builder) => ({
    getAttributes: builder.query({
      query: () => "/attributes",
      providesTags: ["Attributes"],
    }),
    getAttributeById: builder.query({
      query: (id) => `/attributes/${id}`,
      providesTags: ["Attributes"],
    }),
    getAttributeByName: builder.query({
      query: (name) => `/attributes/name/${name}`,
      providesTags: ["Attributes"],
    }),
    createAttribute: builder.mutation({
      query: (newAttr) => ({
        url: "/attributes",
        method: "POST",
        body: newAttr,
      }),
      invalidatesTags: ["Attributes"],
    }),
    updateAttribute: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/attributes/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Attributes"],
    }),
    deleteAttribute: builder.mutation({
      query: (id) => ({
        url: `/attributes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Attributes"],
    }),
    // Attribute values
    getAttributeValues: builder.query({
      query: () => "/attributes/values",
      providesTags: ["Attributes"],
    }),
    getAttributeValueById: builder.query({
      query: (id) => `/attributes/values/${id}`,
      providesTags: ["Attributes"],
    }),
    createAttributeValue: builder.mutation({
      query: (value) => ({
        url: "/attributes/values",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["Attributes"],
    }),
    updateAttributeValue: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/attributes/values/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Attributes"],
    }),
    deleteAttributeValue: builder.mutation({
      query: (id) => ({
        url: `/attributes/values/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Attributes"],
    }),
  }),
});

export const {
  useGetAttributesQuery,
  useGetAttributeByIdQuery,
  useGetAttributeByNameQuery,
  useCreateAttributeMutation,
  useUpdateAttributeMutation,
  useDeleteAttributeMutation,
  useGetAttributeValuesQuery,
  useGetAttributeValueByIdQuery,
  useCreateAttributeValueMutation,
  useUpdateAttributeValueMutation,
  useDeleteAttributeValueMutation,
} = attributeApi;
