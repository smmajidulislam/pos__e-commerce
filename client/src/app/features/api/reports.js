import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@/actions/config";

export const reportsApi = createApi({
  reducerPath: "reportsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config?.base_url,
    credentials: "include",
  }),
  tagTypes: ["Reports"],
  endpoints: (builder) => ({
    // Monthly sales report
    getMonthlySales: builder.query({
      query: () => `/sales/reports/monthly-sales`,
      providesTags: ["Reports"],
    }),
    // Customers list
    getCustomerReport: builder.query({
      query: () => `/customers`,
      providesTags: ["Reports"],
    }),
    // Individual customer due
    getCustomerDue: builder.query({
      query: (id) => `/sales/dues/${id}`,
      providesTags: ["Reports"],
    }),

    getProfitAndLoss: builder.query({
      query: () => `/statements`,
      providesTags: ["Reports"],
    }),
    lowStockReportS: builder.query({
      query: () => `/products/low-stock`,
      providesTags: ["Reports"],
    }),
    supplierReport: builder.query({
      query: () => `/suppliers`,
      providesTags: ["Reports"],
    }),
    chatData: builder.query({
      query: () => `/sales/monthly-sales`,
      providesTags: ["Reports"],
    }),
    getDashboard: builder.query({
      query: () => `/dashboard/counts`,
      providesTags: ["Reports"],
    }),
    getFinnaceReport: builder.query({
      query: () => `/dashboard/finance-total`,
      providesTags: ["Reports"],
    }),
  }),
});

export const {
  useGetMonthlySalesQuery,
  useGetCustomerReportQuery,
  useGetCustomerDueQuery,
  useGetProfitAndLossQuery,
  useLowStockReportSQuery,
  useSupplierReportQuery,
  useChatDataQuery,
  useGetDashboardQuery,
  useGetFinnaceReportQuery,
} = reportsApi;
