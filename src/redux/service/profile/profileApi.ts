import { baseApi } from "../baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminProfile: builder.query({
      query: () => "/admin/profile",
    }),
  }),
});

export const { useGetAdminProfileQuery } = profileApi;
