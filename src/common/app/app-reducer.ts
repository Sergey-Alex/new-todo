import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error;
    },
    setAppStatus: (
      state,
      action: PayloadAction<{ status: RequestStatusType }>,
    ) => {
      console.log(action.payload.status)
      state.status = action.payload.status;
    },
    setAppInitialized: (
      state,
      action: PayloadAction<{ isInitialized: boolean }>,
    ) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
});
export const appActions = slice.actions;
export const appReducer = slice.reducer;
export type AppInitialState = ReturnType<typeof slice.getInitialState>;

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";


