import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface uiState {
  menuStatus: "open" | "closed";
}

const initialState: uiState = {
  menuStatus: "open",
};
export type MenuStatus = "open" | "closed";

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    updateMenuStatus: (state, { payload }: PayloadAction<MenuStatus>) => {
      return { ...state, menuStatus: payload };
    },
  },
});

export const { updateMenuStatus } = uiSlice.actions;

export default uiSlice.reducer;
