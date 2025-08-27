import config from "@/actions/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const couponsApi = createApi({
  reducerPath: "couponsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config?.base_url,
    credentials: "include",
  }),
  tagTypes: ["Coupons"],
  endpoints: (builder) => ({
    // ✅ Get all coupons (with filter support)
    getCoupons: builder.query({
      query: (params) => ({
        url: "/coupons",
        method: "GET",
        params,
      }),
      providesTags: ["Coupons"],
    }),

    // ✅ Get coupon by ID
    getCouponById: builder.query({
      query: (id) => `/coupon/${id}`,
      providesTags: ["Coupons"],
    }),

    // ✅ Get coupon by code
    getCouponByCode: builder.query({
      query: (code) => `/coupon/code/${code}`,
      providesTags: ["Coupons"],
    }),

    // ✅ Get coupon by product ID
    getCouponByProductId: builder.query({
      query: (productId) => `/coupon/product/${productId}`,
      providesTags: ["Coupons"],
    }),

    // ✅ Create new coupon
    createCoupon: builder.mutation({
      query: (newCoupon) => ({
        url: "/coupons",
        method: "POST",
        body: newCoupon,
      }),
      invalidatesTags: ["Coupons"],
    }),

    // ✅ Update coupon
    updateCoupon: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/coupon/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Coupons"],
    }),

    // ✅ Delete coupon
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/coupon/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupons"],
    }),
  }),
});

export const {
  useGetCouponsQuery,
  useGetCouponByIdQuery,
  useGetCouponByCodeQuery,
  useGetCouponByProductIdQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} = couponsApi;
