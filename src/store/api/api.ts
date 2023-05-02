import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { User } from "./types";

export interface UserResponse extends User {
  access_token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<UserResponse, { email: string; password: string }>(
      {
        query: (body) => ({
          url: "auth/signUp",
          method: "POST",
          body,
        }),
      }
    ),
    signIn: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "auth/signIn",
        method: "POST",
        body: credentials,
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => "protected",
    }),
    tokenAuth: builder.mutation<UserResponse, { token: string }>({
      query: () => ({
        url: "auth/tokenSignIn",
        method: "GET",
      }),
    }),
    createProject: builder.mutation<any, { title: string }>({
      query: (body) => ({
        url: "tasks/createProject",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useProtectedMutation,
  useTokenAuthMutation,
  useCreateProjectMutation,
} = api;
