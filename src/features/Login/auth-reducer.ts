import { AppThunk } from "app/store";

import { authAPI, LoginParamsType } from "api/todolist-api";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appAction } from "app/app-reducer";

export const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

export const authReducer = slice.reducer;
export const authAction = slice.actions;

export const loginTC =
  (params: LoginParamsType): AppThunk =>
  (dispatch) => {
    dispatch(appAction.setAppStatus({ status: "loading" }));
    authAPI
      .login(params)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(authAction.setIsLoggedIn({ isLoggedIn: true }));
          dispatch(appAction.setAppStatus({ status: "succeeded" }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const logOutTC = (): AppThunk => (dispatch) => {
  dispatch(appAction.setAppStatus({ status: "loading" }));
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(authAction.setIsLoggedIn({ isLoggedIn: false }));
        dispatch(appAction.setAppStatus({ status: "succeeded" }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};
