import { appActions } from "common/app/app-reducer";

import { handleServerNetworkError } from "utils/handleServerNetworkError";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "common/app/store";
import { todolistActions } from "features/TodolistsList/todolists-reducer";
import {createAppAsyncThunk, handleServerAppError} from "utils";
import { authAPI, LoginParamsType } from "features/Login/authApi";
import {ResultCode} from "../../common/enums";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
    extraReducers: builder => {
      builder
          .addCase(login.fulfilled, (state, action)=> {
              state.isLoggedIn = action.payload.isLoggedIn;
          })
          .addCase(logout.fulfilled, (state, action) => {
              state.isLoggedIn = action.payload.isLoggedIn;
      })
    }
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;

// thunks
export const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>
('auth/login', async (arg, thunkAPI) =>{
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({ status: "loading" }));
        const res = await authAPI.login(arg)
                if (res.data.resultCode === ResultCode.success) {
                    dispatch(appActions.setAppStatus({ status: "succeeded" }));
                    return { isLoggedIn: true }
                } else {
                    handleServerAppError(res.data, dispatch);
                    return rejectWithValue(null)
                }
    } catch (error) {
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null);
    }
})

// export const loginTC =
//   (data: LoginParamsType): AppThunk =>
//   (dispatch) => {
//     dispatch(appActions.setAppStatus({ status: "loading" }));
//     authAPI
//       .login(data)
//       .then((res) => {
//         if (res.data.resultCode === 0) {
//           // dispatch(setIsLoggedInAC(true));
//           dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
//           dispatch(appActions.setAppStatus({ status: "succeeded" }));
//         } else {
//           handleServerAppError(res.data, dispatch);
//         }
//       })
//       .catch((error) => {
//         handleServerNetworkError(error, dispatch);
//       });
//   };

export const logout = createAppAsyncThunk<any, any>
('auth/logout', async (_, thunkAPI)=>{
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({ status: "loading" }));
        const res = await authAPI.logout()
        if (res.data.resultCode === ResultCode.success){
            dispatch(appActions.setAppStatus({ status: "succeeded" }));
            dispatch(todolistActions.clearData());
            return { isLoggedIn: false }
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    } catch (e){
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(null);
    }
})

// export const logoutTC_ = (): AppThunk => (dispatch) => {
//   dispatch(appActions.setAppStatus({ status: "loading" }));
//   authAPI
//     .logout()
//     .then((res) => {
//       if (res.data.resultCode === 0) {
//         dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
//         dispatch(appActions.setAppStatus({ status: "succeeded" }));
//         dispatch(todolistActions.clearData());
//       } else {
//         handleServerAppError(res.data, dispatch);
//       }
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch);
//     });
// };

// types
export const authThunk = {login,logout}