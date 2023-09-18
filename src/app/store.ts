import { AnyAction, combineReducers } from "redux";
import {
  ActionTaskType,
  taskReducers,
} from "features/TodolistsLists/Todolist/Tasks/task-reducers";
import {
  TodolistActionType,
  todolistReducers,
} from "features/TodolistsLists/Todolist/todolistsReducers";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";
import { AppActionStateType, appReducer } from "./app-reducer";
import { authReducer } from "features/Login/auth-reducer";
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

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AnyAction
>;
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;

//@ts-ignore
window.store = store;
