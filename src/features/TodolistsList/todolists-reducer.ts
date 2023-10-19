import {appActions, RequestStatusType} from "common/app/app-reducer";
import {handleServerNetworkError} from "utils/handleServerNetworkError";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {todolistsAPI, TodolistType, UpdateTodolistParamArg} from "./todolistsApi";
import {createAppAsyncThunk, handleServerAppError} from "utils";
import {ResultCode} from "../../common/enums";

export const slice = createSlice({
  name: "todolist",
  initialState: [] as TodolistDomainType[],
  reducers: {
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
    builder
        .addCase(fetchTodolists.fulfilled, (state, action) => {
      action.payload.todolists.forEach((tl) => {
          state.push({ ...tl, filter: "all", entityStatus: "idle" });
        });

    }).addCase(removeTodolist.fulfilled, (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
      if (index !== -1) state.splice(index, 1);
    })
        .addCase(addTodolist.fulfilled, (state, action) =>{
          state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
    })
        .addCase(changeTodolistTitle.fulfilled, (state, action) => {
          const index = state.findIndex((todo) => todo.id === action.payload.id);
          if (index !== -1) state[index].title = action.payload.title;
        })

  },
});
export const todolistActions = slice.actions;
export const todolistReducer = slice.reducer;

// thunks
export const fetchTodolists = createAppAsyncThunk<{
  todolists: TodolistType[];
}>("todolist/fetchTodolist", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await todolistsAPI.getTodolists();
    dispatch(appActions.setAppStatus({ status: "succeeded" }));
    return { todolists: res.data };
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

export const removeTodolist = createAppAsyncThunk<{todolistId:string}, string >
('todolist/removeTodolist', async (arg, thunkAPI) => {

   const {dispatch, rejectWithValue} = thunkAPI
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await todolistsAPI.deleteTodolist(arg)
    if (res.data.resultCode === ResultCode.success){
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return {todolistId: arg}
    }else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }

  }catch (e){
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
})
export const addTodolist = createAppAsyncThunk<{todolist: TodolistType }, {title: string}>(
    'todolist/addTodolist',
    async (arg, thunkAPI) => {
      const {dispatch, rejectWithValue} = thunkAPI
      dispatch(appActions.setAppStatus({ status: "loading" }));
      try {
        const res = await todolistsAPI.createTodolist(arg.title)
        if (res.data.resultCode === ResultCode.success){
          dispatch(appActions.setAppStatus({ status: "succeeded" }));
          return {todolist: res.data.data.item}
        } else {
          handleServerAppError(res.data, dispatch);
          return rejectWithValue(null);
        }
      }catch (e){
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(null);
      }
    }
)

// export const addTodolistTC = (title: string): AppThunk => {
//   return (dispatch) => {
//     dispatch(appActions.setAppStatus({ status: "loading" }));
//     todolistsAPI.createTodolist(title).then((res) => {
//       dispatch(todolistActions.addTodolist({ todolist: res.data.data.item }));
//       dispatch(appActions.setAppStatus({ status: "succeeded" }));
//     });
//   };
// };


export const changeTodolistTitle = createAppAsyncThunk<UpdateTodolistParamArg ,UpdateTodolistParamArg>(
    'todolist/changeTodolist',
    async (arg, thunkAPI) => {
      const {dispatch, rejectWithValue} = thunkAPI
      dispatch(appActions.setAppStatus({ status: "loading" }));
      try {
        const res = await todolistsAPI.updateTodolist(arg)
        if (res.data.resultCode === ResultCode.success) {
          dispatch(appActions.setAppStatus({status: "succeeded"}));
          return { id: arg.id, title: arg.title}
        } else {
          handleServerAppError(res.data, dispatch);
          return rejectWithValue(null);
        }
      }catch (e) {
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(null);
      }
    }
)


// types

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

export const todolistThunk = { fetchTodolists,removeTodolist, addTodolist, changeTodolistTitle };
