import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/admin/user",
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
