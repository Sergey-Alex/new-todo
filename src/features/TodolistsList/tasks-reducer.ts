import { appActions } from "common/app/app-reducer";
import {
  createAppAsyncThunk,
  handleServerAppError,
  handleServerNetworkError,
} from "utils";
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTodolists,
  todolistActions,
} from "features/TodolistsList/todolists-reducer";
import { ResultCode } from "common/enums";
import { tasksApi } from "features/TodolistsList/tasksApi";
import {
  AddTaskArg,
  DeleteTaskArg,
  TaskType,
  UpdateTaskArg,
  UpdateTaskModelType,
} from "features/TodolistsList/taskApiTypes";

const slice = createSlice({
  name: "task",
  initialState: {} as TasksStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(todolistActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        delete state[action.payload.taskId];
      })
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl: any) => {
          state[tl.id] = [];
        });
      })
      .addCase(todolistActions.clearData, () => {
        return {};
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const taskForCurrentTodolist = state[action.payload.task.todoListId];
        taskForCurrentTodolist.unshift(action.payload.task);
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const taskForTodolist = state[action.payload.todolistId];
        const index = taskForTodolist.findIndex(
          (task) => task.id === action.payload.taskId,
        );
        if (index !== -1) taskForTodolist.splice(index, 1);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const taskForTodolist = state[action.payload.todolistId];
        const index = taskForTodolist.findIndex(
          (t) => t.id === action.payload.taskId,
        );
        if (index !== -1) {
          taskForTodolist[index] = {
            ...taskForTodolist[index],
            ...action.payload.domainModel,
          };
        }
      });
  },
});

export const tasksActions = slice.actions;
export const tasksReducer = slice.reducer;

// thunks
export const fetchTasks = createAppAsyncThunk<
  { tasks: TaskType[]; todolistId: string },
  string
>("task/fetchTasksTC", async (todolistId, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    const res = await tasksApi.getTasks(todolistId);
    const tasks = res.data.items;
    dispatch(appActions.setAppStatus({ status: "succeeded" }));
    return { tasks, todolistId };
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});

export const removeTask = createAppAsyncThunk<DeleteTaskArg, DeleteTaskArg>(
  "task/removeTask",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const res = await tasksApi.deleteTask(arg);
      if (res.data.resultCode === ResultCode.success) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return arg;
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  },
);

const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArg>(
  "task/addTask",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const res = await tasksApi.createTask(arg);
      if (res.data.resultCode === ResultCode.success) {
        const task = res.data.data.item;
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return { task };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  },
);

const updateTask = createAppAsyncThunk<UpdateTaskArg, UpdateTaskArg>(
  "tasks/updateTask",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const state = getState();
      const task = state.tasks[arg.todolistId].find((t) => t.id === arg.taskId);
      if (!task) {
        dispatch(appActions.setAppError({ error: "Task not found" }));
        return rejectWithValue(null);
      }

      const apiModel: UpdateTaskModelType = {
        ...task,
        ...arg.domainModel,
      };

      const res = await tasksApi.updateTask({
        todolistId: arg.todolistId,
        taskId: arg.taskId,
        domainModel: apiModel,
      });

      if (res.data.resultCode === 0) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return {
          todolistId: arg.todolistId,
          taskId: arg.taskId,
          domainModel: apiModel,
        };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    }
  },
);

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
export const taskThunk = { fetchTasks, addTask, updateTask, removeTask };
