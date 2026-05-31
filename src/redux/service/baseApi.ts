import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://rafeek-three.vercel.app",

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Auth"],

  endpoints: () => ({}),
});
