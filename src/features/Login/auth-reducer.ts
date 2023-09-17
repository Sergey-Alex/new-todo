import { AppThunk } from "app/store";
import { setAppStatusAC } from "app/app-reducer";
import { authAPI, LoginParamsType } from "api/todolist-api";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const IS_LOGIN_IN = "login/IS_LOGIN_IN";
type StateDefaultType = {
  isLoggedIn: boolean;
};
export type ActionAuthType = ReturnType<typeof setIsLoggedInAC>;
const InitialStateAuth: StateDefaultType = {
  isLoggedIn: false,
};

export const _authReducer = (
  state = InitialStateAuth,
  action: ActionAuthType,
): StateDefaultType => {
  switch (action.type) {
    case IS_LOGIN_IN:
      return { ...state, isLoggedIn: action.isLoggedIn };
    default:
      return state;
  }
};

export const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = true;
    },
  },
});

export const authReducer = slice.reducer;
export const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return { type: IS_LOGIN_IN, isLoggedIn } as const;
};

export const loginTC =
  (params: LoginParamsType): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    authAPI
      .login(params)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedInAC(true));
          dispatch(setAppStatusAC("succeeded"));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const logOutTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(false));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};
