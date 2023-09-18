import { AppThunk } from "./store";
import { authAPI } from "api/todolist-api";
import { authAction } from "features/Login/auth-reducer";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const InitialState = {
  status: "loading" as RequestStatusType,
  error: null,
  isInitialized: true,
};

export type InitialStateType = {
  status: RequestStatusType;
  error: string | null;
  isInitialized: boolean;
};
export type AppActionStateType =
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppError>
  | ReturnType<typeof setAppInitializedAC>;

export const appReducer = (
  state: InitialStateType = InitialState,
  action: AppActionStateType,
): InitialStateType => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.status };
    case "APP/SET-ERROR":
      return { ...state, error: action.error };
    case "APP/SET-IS-INITIALIZED":
      return { ...state, isInitialized: action.value };
    default:
      return state;
  }
};
export const initializeAppTC = (): AppThunk => (dispatch) => {
  authAPI.me().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(authAction.setIsLoggedIn({ isLoggedIn: true }));
    } else {
    }
    dispatch(setAppInitializedAC(true));
  });
};

export const setAppStatusAC = (status: RequestStatusType) => {
  return { type: "APP/SET-STATUS", status } as const;
};
export const setAppInitializedAC = (value: boolean) => {
  return { type: "APP/SET-IS-INITIALIZED", value } as const;
};
export const setAppError = (error: string | null) => {
  return { type: "APP/SET-ERROR", error } as const;
};
