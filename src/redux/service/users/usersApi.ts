import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/admin/user",
    }),
    getUserById: builder.query({
      query: (id: string) => ({
        url: `/admin/user/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery } = userApi;
