import { baseApi } from "../baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: "/admin/order",
        method: "GET",
      }),
    }),
    getOrderById: builder.query({
      query: (id: string) => `/admin/order/${id}`,
    }),
  }),
});

export const { useGetOrdersQuery, useGetOrderByIdQuery } = orderApi;
