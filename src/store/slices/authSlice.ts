import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import type { User } from "../../app/services/auth";
import { RootState } from "../store";
import { User } from "../api/types";
import { UserResponse } from "../api/api";

type AuthState = {
  user: User | null;
  token: string | null;
};

const slice = createSlice({
  name: "auth",
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials: (state, { payload }: PayloadAction<UserResponse>) => {
      const { access_token, ...user } = payload;
      state.user = user;
      state.token = access_token;
    },
  },
});

export const { setCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
