import { AppThunk } from "./store";
import { authAPI } from "api/todolist-api";
import { authAction } from "features/Login/auth-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export const slice = createSlice({
  name: "app",
  initialState: {
    status: "loading" as RequestStatusType,
    error: null as null | string,
    isInitialized: true,
  },
  reducers: {
    setAppStatus: (
      state,
      action: PayloadAction<{ status: RequestStatusType }>,
    ) => {
      state.status = action.payload.status;
    },
    setAppInitialized: (
      state,
      action: PayloadAction<{ isInitialized: boolean }>,
    ) => {
      state.isInitialized = action.payload.isInitialized;
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
  },
});

export const appAction = slice.actions;
export const appReducer = slice.reducer;
export type AppInitialState = ReturnType<typeof slice.getInitialState>;
export const initializeAppTC = (): AppThunk => (dispatch) => {
  authAPI.me().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(authAction.setIsLoggedIn({ isLoggedIn: true }));
    } else {
    }
    dispatch(appAction.setAppInitialized({ isInitialized: true }));
  });
};
