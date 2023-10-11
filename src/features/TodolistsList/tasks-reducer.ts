import {
  AddTaskArg,
  DeleteTaskArg,
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistsAPI,
  UpdateTaskArg,
  UpdateTaskModelType,
} from "api/todolists-api";
import { appActions } from "app/app-reducer";
import {
  createAppAsyncThunk,
  handleServerAppError,
  handleServerNetworkError,
} from "utils";
import { createSlice } from "@reduxjs/toolkit";
import { todolistActions } from "features/TodolistsList/todolists-reducer";

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
      .addCase(todolistActions.removeTodolist, (state, action) => {
        delete state[action.payload.id];
      })
      .addCase(todolistActions.setTodolists, (state, action) => {
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
    const res = await todolistsAPI.getTasks(todolistId);
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
      const res = await todolistsAPI.deleteTask(arg);
      if (res.data.resultCode === 0) {
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

// export const removeTask = createAppAsyncThunk<
//   { task: TaskType },
//   DeleteTaskArg
// >("task/removeTask", async (arg, thunkAPI) => {
//   const { dispatch, rejectWithValue } = thunkAPI;
//   try {
//     const res = await todolistsAPI.deleteTask(arg);
//     if (res.data.resultCode === 0) {
//       const task = res.data.data.
//       return { task };
//     } else {
//       handleServerAppError(res.data, dispatch);
//       return rejectWithValue(null);
//     }
//   } catch (error) {
//     handleServerNetworkError(error, dispatch);
//     return rejectWithValue(null);
//   }
// });

// export const removeTaskTC =
//   (taskId: string, todolistId: string): AppThunk =>
//   (dispatch: Dispatch) => {
//     todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
//       const action = tasksActions.removeTask({ taskId, todolistId });
//       dispatch(action);
//     });
//   };

const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArg>(
  "task/addTask",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const res = await todolistsAPI.createTask(arg);
      if (res.data.resultCode === 0) {
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

      const res = await todolistsAPI.updateTask({
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
// //
// const updateTask = createAppAsyncThunk<UpdateTaskArg, UpdateTaskArg>(
//   "task/updateTask",
//   async (arg, thunkAPI) => {
//     const { dispatch, rejectWithValue, getState } = thunkAPI;
//     try {
//       dispatch(appActions.setAppStatus({ status: "loading" }));
//       const state = getState();
//       const task = state.tasks[arg.todolistId].find((t) => t.id === arg.taskId);
//       if (!task) {
//         //throw new Error("task not found in the state");
//         dispatch(appActions.setAppError({ error: "Task not found" }));
//         return rejectWithValue(null);
//       }
//       const apiModel: UpdateTaskModelType = {
//         deadline: task.deadline,
//         description: task.description,
//         priority: task.priority,
//         startDate: task.startDate,
//         title: task.title,
//         status: task.status,
//         ...arg.domainModel
//       };
//       const res = await todolistsAPI.updateTask({
//         todolistId: arg.todolistId,
//         taskId: arg.taskId,
//         domainModel: apiModel
//       });
//
//       if (res.data.resultCode === 0) {
//         dispatch(appActions.setAppStatus({ status: "succeeded" }));
//         return {
//           todolistId: arg.todolistId,
//           taskId: arg.taskId,
//           domainModel: arg.domainModel
//         };
//
//       } else {
//         handleServerAppError(res.data, dispatch);
//         rejectWithValue(null);
//       }
//     } catch (err) {
//       handleServerNetworkError(err, dispatch);
//       rejectWithValue(null);
//     }
//   }
// );

// export const _updateTaskTC =
//   (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunk =>
//     (dispatch, getState: () => AppRootStateType) => {
//       const state: AppRootStateType = getState();
//       const task = state.tasks[todolistId].find((t) => t.id === taskId);
//       if (!task) {
//         //throw new Error("task not found in the state");
//         console.warn("task not found in the state");
//         return;
//       }
//
//       const apiModel: UpdateTaskModelType = {
//         deadline: task.deadline,
//         description: task.description,
//         priority: task.priority,
//         startDate: task.startDate,
//         title: task.title,
//         status: task.status,
//         ...domainModel
//       };
//
//       todolistsAPI
//         .updateTask(todolistId, taskId, apiModel)
//         .then((res) => {
//           if (res.data.resultCode === 0) {
//             const action = tasksActions.updateTask({ taskId, model: domainModel, todolistId });
//             dispatch(action);
//           } else {
//             handleServerAppError(res.data, dispatch);
//           }
//         })
//         .catch((error) => {
//           handleServerNetworkError(error, dispatch);
//         });
//     };

// types
export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
export const taskThunk = { fetchTasks, addTask, updateTask, removeTask };
