import { AppRootStateType } from "common/app/store";

export const selectTask = (state: AppRootStateType) => state.tasks;
