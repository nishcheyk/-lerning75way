import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

interface User {
  _id: string;
  name: string;
  email: string;
  provider: "google" | "manual" | "facebook" | "apple" | "linkedin";
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/auth" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<{ accessToken: string; refreshToken: string; user: User }>, { email: string; password: string }>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<ApiResponse<User>, { name: string; email: string; password: string; confirmPassword: string }>({
      query: (user) => ({
        url: "register",
        method: "POST",
        body: user,
      }),
    }),
    logout: builder.mutation<ApiResponse<void>, void>({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = api;
