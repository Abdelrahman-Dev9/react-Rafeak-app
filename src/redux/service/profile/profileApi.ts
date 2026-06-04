import { baseApi } from "../baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminProfile: builder.query({
      query: () => "/admin/profile",
      providesTags: ["Profile"],
    }),
    updateAdminProfile: builder.mutation({
      query: (formData) => ({
        url: "/admin/profile",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/admin/password",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAdminProfileQuery,
  useUpdateAdminProfileMutation,
  useChangePasswordMutation,
} = profileApi;
