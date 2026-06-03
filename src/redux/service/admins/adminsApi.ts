import { baseApi } from "../baseApi";

export const adminsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdmins: builder.query({
      query: () => "/admin/getAdmins",
      providesTags: ["Admins"],
    }),
    addAdmin: builder.mutation({
      query: (body) => ({
        url: "/admin/addAdmin",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admins"],
    }),
  }),
});

export const { useGetAdminsQuery, useAddAdminMutation } = adminsApi;
