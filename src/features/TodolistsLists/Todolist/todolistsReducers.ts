import { todolistApi, TodoListType } from "api/todolist-api";
import { AppThunk } from "app/store";
import { appAction, RequestStatusType } from "app/app-reducer";
import { handleServerNetworkError } from "utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const REMOVE_TODOLIST = "REMOVE-TODOLIST";
export const ADD_TODOLIST = "ADD-TODOLIST";
export const CHANGE_TODOLIST_TITLE = "CHANGE-TODOLIST-TITLE";
export const CHANGE_TODOLIST_FILTER = "CHANGE-TODOLIST-FILTER";
export const SET_TODOLIST = "SET_TODOLIST";

export type FilterValueType = "all" | "active" | "completed";
export type TodolistDomainType = TodoListType & {
  filter: FilterValueType;
  entityStatus: RequestStatusType;
};

const slice = createSlice({
  name: "todolist",
  initialState: [] as TodolistDomainType[],
  reducers: {
    addTodolist: (state, action: PayloadAction<{ todolist: TodoListType }>) => {
      state.unshift({
        ...action.payload.todolist,
        entityStatus: "idle",
        filter: "all",
      });
    },
    removeTodolist: (state, action: PayloadAction<{ todolistId: string }>) => {
      const index = state.findIndex(
        (todo) => todo.id === action.payload.todolistId,
      );
      if (index !== -1) state.splice(index, 1);
    },
    changeTodolistTitle: (
      state,
      action: PayloadAction<{ todolistId: string; title: string }>,
    ) => {
      const index = state.findIndex(
        (todo) => todo.id === action.payload.todolistId,
      );
      if (index !== -1) state[index].title = action.payload.title;
    },
    changeTodolistFilter: (
      state,
      action: PayloadAction<{ todolistId: string; filter: FilterValueType }>,
    ) => {
      const index = state.findIndex(
        (todo) => todo.id === action.payload.todolistId,
      );
      if (index !== -1) state[index].filter = action.payload.filter;
    },
    changeTodolistEntityStatus: (
      state,
      action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>,
    ) => {
      const index = state.findIndex(
        (todo) => todo.id === action.payload.entityStatus,
      );
      if (index !== -1) state[index].entityStatus = action.payload.entityStatus;
    },
    setTodolist: (
      state,
      action: PayloadAction<{ todolists: TodoListType[] }>,
    ) => {
      // return action.payload.todolists;
      action.payload.todolists.map((tl) => {
        state.push({ ...tl, filter: "all", entityStatus: "idle" });
      });
    },
  },
});

export const todolistActions = slice.actions;
export const todolistReducers = slice.reducer;

export const fetchTodolistTC = (): AppThunk => (dispatch) => {
  dispatch(appAction.setAppStatus({ status: "loading" }));
  todolistApi
    .getTodolistAll()
    .then((res) => {
      dispatch(todolistActions.setTodolist({ todolists: res.data }));
      dispatch(appAction.setAppStatus({ status: "succeeded" }));
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch);
    });
};

export const deleteTodolistTC =
  (todoListId: string): AppThunk =>
  (dispatch) => {
    dispatch(appAction.setAppStatus({ status: "loading" }));
    dispatch(
      todolistActions.changeTodolistEntityStatus({
        id: todoListId,
        entityStatus: "loading",
      }),
    );
    todolistApi.deleteTodolist(todoListId).then(() => {
      dispatch(todolistActions.removeTodolist({ todolistId: todoListId }));
      dispatch(appAction.setAppStatus({ status: "succeeded" }));
    });
  };
export const addTodolistTC =
  (title: string): AppThunk =>
  (dispatch) => {
    dispatch(appAction.setAppStatus({ status: "loading" }));
    todolistApi.createTodolist(title).then((res) => {
      dispatch(todolistActions.addTodolist({ todolist: res.data.data.item }));
      dispatch(appAction.setAppStatus({ status: "succeeded" }));
    });
  };
export type ChangeTodolistTitleArgs = { todoListId: string; title: string };
export const ChangeTodolistTitleTC =
  ({ todoListId, title }: ChangeTodolistTitleArgs): AppThunk =>
  (dispatch) => {
    dispatch(appAction.setAppStatus({ status: "loading" }));
    todolistApi.updateTodolist(todoListId, title).then(() => {
      dispatch(
        todolistActions.changeTodolistTitle({ todolistId: todoListId, title }),
      );
      dispatch(appAction.setAppStatus({ status: "succeeded" }));
    });
  };
