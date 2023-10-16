import { AppRootStateType } from "common/app/store";

export const selectIsLoggedIn = (state: AppRootStateType) =>
  state.auth.isLoggedIn;
