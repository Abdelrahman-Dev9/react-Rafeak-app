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
    getAdminById: builder.query({
      query: (id: string) => `/admin/getAdmin/${id}`,
    }),
    deleteAdmin: builder.mutation({
      query: (id: string) => ({
        url: `/admin/deleteAdmin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admins"],
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useAddAdminMutation,
  useGetAdminByIdQuery,
  useDeleteAdminMutation,
} = adminsApi;
