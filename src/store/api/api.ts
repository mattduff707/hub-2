import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { User } from "./types";

export interface UserResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      //   const token = (getState() as RootState).auth.token;
      //   if (token) {
      //     headers.set("authorization", `Bearer ${token}`);
      //   }
      //   return headers;
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
  }),
});

export const { useSignUpMutation, useSignInMutation, useProtectedMutation } =
  api;
