import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: "/admin/dashboard/stats",
        method: "GET",
      }),
    }),
    getDashboardOrders: builder.query({
      query: () => ({
        url: "/admin/dashboard/order",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashboardStatsQuery, useGetDashboardOrdersQuery } =
  authApi;
