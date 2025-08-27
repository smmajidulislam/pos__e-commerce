import config from "@/actions/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storeApi = createApi({
  reducerPath: "storeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config?.base_url,
    credentials: "include",
  }),
  tagTypes: ["Stores"],
  endpoints: (builder) => ({
    getStores: builder.query({
      query: () => "/stores",
      providesTags: ["Stores"],
    }),
    getStoreById: builder.query({
      query: (id) => `/stores/${id}`,
      providesTags: ["Stores"],
    }),
    createStore: builder.mutation({
      query: (newStore) => ({
        url: "/stores",
        method: "POST",
        body: newStore,
      }),
      invalidatesTags: ["Stores"],
    }),
    updateStore: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/stores/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Stores"],
    }),
    deleteStore: builder.mutation({
      query: (id) => ({
        url: `/stores/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Stores"],
    }),
  }),
});

export const {
  useGetStoresQuery,
  useGetStoreByIdQuery,
  useCreateStoreMutation,
  useUpdateStoreMutation,
  useDeleteStoreMutation,
} = storeApi;
