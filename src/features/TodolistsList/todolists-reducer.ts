import { appActions, RequestStatusType } from "common/app/app-reducer";
import { handleServerNetworkError } from "utils/handleServerNetworkError";
import { AppThunk } from "common/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todolistsAPI, TodolistType } from "./todolistsApi";
import { createAppAsyncThunk } from "utils";

export const slice = createSlice({
  name: "todolist",
  initialState: [] as TodolistDomainType[],
  reducers: {
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      state.unshift({
        ...action.payload.todolist,
        filter: "all",
        entityStatus: "idle",
      });
    },
    removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) state.splice(index, 1);
    },
    changeTodolistTitle: (
      state,
      action: PayloadAction<{ id: string; title: string }>,
    ) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) state[index].title = action.payload.title;
    },
    changeTodolistFilter: (
      state,
      action: PayloadAction<{ id: string; filter: FilterValuesType }>,
    ) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) state[index].filter = action.payload.filter;
    },
    changeTodolistEntityStatus: (
      state,
      action: PayloadAction<{ id: string; status: RequestStatusType }>,
    ) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) state[index].entityStatus = action.payload.status;
    },
    // setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>,
    // ) => {action.payload.todolists.forEach((tl) => {state.push({ ...tl, filter: "all", entityStatus: "idle" })})},
    clearData: () => {
      return [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodolists.fulfilled, (state, action) => {
      {
        action.payload.todolists.forEach((tl) => {
          state.push({ ...tl, filter: "all", entityStatus: "idle" });
        });
      }
    });
  },
});
export const todolistActions = slice.actions;
export const todolistReducer = slice.reducer;

// thunks
export const fetchTodolists = createAppAsyncThunk<{
  todolists: TodolistType[];
}>("todolist/fetchTodolist", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    const res = await todolistsAPI.getTodolists();
    return { todolists: res.data };
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

// export const fetchTodolistsTC = (): AppThunk => {
//   return (dispatch) => {
//     dispatch(appActions.setAppStatus({ status: "loading" }));
//     todolistsAPI
//       .getTodolists()
//       .then((res) => {
//         dispatch(todolistActions.setTodolists({ todolists: res.data }));
//         dispatch(appActions.setAppStatus({ status: "succeeded" }));
//         return res.data;
//       })
//       .then((todos) => {
//         todos.forEach((tl) => {
//           dispatch(taskThunk.fetchTasks(tl.id));
//         });
//       })
//       .catch((error) => {
//         handleServerNetworkError(error, dispatch);
//       });
//   };
// };
export const removeTodolistTC = (todolistId: string): AppThunk => {
  return (dispatch) => {
    //изменим глобальный статус приложения, чтобы вверху полоса побежала
    dispatch(appActions.setAppStatus({ status: "loading" }));
    //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    dispatch(
      todolistActions.changeTodolistEntityStatus({
        status: "loading",
        id: todolistId,
      }),
    );
    todolistsAPI.deleteTodolist(todolistId).then((res) => {
      dispatch(todolistActions.removeTodolist({ id: todolistId }));
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
    });
  };
};
export const addTodolistTC = (title: string): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    todolistsAPI.createTodolist(title).then((res) => {
      dispatch(todolistActions.addTodolist({ todolist: res.data.data.item }));
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
    });
  };
};
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
  return (dispatch) => {
    todolistsAPI.updateTodolist(id, title).then((res) => {
      dispatch(todolistActions.changeTodolistTitle({ id: id, title: title }));
    });
  };
};

// types

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

export const todolistThunk = { fetchTodolists };
