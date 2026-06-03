import { baseApi } from "../baseApi";

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query({
      query: () => "/admin/getReports",
      providesTags: ["Reports"],
    }),
  }),
});

export const { useGetReportsQuery } = reportsApi;
