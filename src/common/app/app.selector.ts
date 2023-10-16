import { AppRootStateType } from "common/app/store";

export const selectStatus = (state: AppRootStateType) => state.app.status;
export const selectIsInitialized = (state: AppRootStateType) =>
  state.app.isInitialized;
