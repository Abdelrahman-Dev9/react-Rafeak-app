import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/forgetpass",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useForgotPasswordMutation } = authApi;
