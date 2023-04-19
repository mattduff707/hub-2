import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Screen {
  app: string;
}

export interface ScreenState {
  active: Screen[];
}

const initialState: ScreenState = {
  active: [],
};

export const screenSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {
    addScreen: (state, { payload }: PayloadAction<Screen>) => {
      return { ...state, active: [...state.active, payload] };
    },
    removeScreen: (state, { payload }: PayloadAction<number>) => {
      return {
        ...state,
        active: state.active.filter((s, idx) => idx !== payload),
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addScreen, removeScreen } = screenSlice.actions;

export default screenSlice.reducer;
