import { BaseResponseType } from "common/types";
import { instance } from "common/api/api";
import {
  AddTaskArg,
  DeleteTaskArg,
  GetTasksResponse,
  TaskType,
  UpdateTaskArg,
} from "./taskApiTypes";

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  deleteTask(arg: DeleteTaskArg) {
    return instance.delete<BaseResponseType>(
      `todo-lists/${arg.todolistId}/tasks/${arg.taskId}`,
    );
  },
  createTask(arg: AddTaskArg) {
    return instance.post<BaseResponseType<{ item: TaskType }>>(
      `todo-lists/${arg.todolistId}/tasks`,
      { title: arg.title },
    );
  },
  updateTask(arg: UpdateTaskArg) {
    return instance.put<BaseResponseType<TaskType>>(
      `todo-lists/${arg.todolistId}/tasks/${arg.taskId}`,
      arg.domainModel,
    );
  },
};
