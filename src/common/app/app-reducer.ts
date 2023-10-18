import { Dispatch } from "redux";

import {authActions, authThunk} from "features/Login/auth-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "common/app/store";
import { authAPI } from "features/Login/authApi";
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from "../../utils";
import {ResultCode} from "../enums";

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


// export const initializeAppTC = (): AppThunk => (dispatch: Dispatch) => {
//   authAPI.me().then((res) => {
//     if (res.data.resultCode === 0) {
//       dispatch(authActions.setAuth);
//     } else {
//
//     }
//     dispatch(appActions.setAppInitialized({ isInitialized: true }));
//   }).finally(() => {
//     dispatch(appActions.setAppStatus({ status: "succeeded" }));
//   });
// };
