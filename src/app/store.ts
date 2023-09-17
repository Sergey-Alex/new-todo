import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {
  ActionTaskType,
  taskReducers,
} from "features/TodolistsLists/Todolist/Tasks/task-reducers";
import {
  TodolistActionType,
  todolistReducers,
} from "features/TodolistsLists/Todolist/todolistsReducers";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";
import { AppActionStateType, appReducer } from "./app-reducer";
import { ActionAuthType, authReducer } from "features/Login/auth-reducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  tasks: taskReducers,
  todolists: todolistReducers,
  app: appReducer,
  auth: authReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});
export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppActionsType =
  | ActionTaskType
  | TodolistActionType
  | AppActionStateType
  | ActionAuthType;
export const useAppDispatch = () =>
  useDispatch<ThunkDispatch<AppRootStateType, unknown, AppActionsType>>();
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppActionsType
>;

//@ts-ignore
window.store = store;
