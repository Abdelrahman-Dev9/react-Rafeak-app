import { baseApi } from "../baseApi";

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => "/admin/notification",
      providesTags: ["Notifications"],
    }),
    addNotification: builder.mutation({
      query: (body) => ({
        url: "/admin/notification",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const { useGetNotificationsQuery, useAddNotificationMutation } =
  notificationsApi;
