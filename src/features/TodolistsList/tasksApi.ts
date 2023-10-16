import { BaseResponseType } from "common/types";
import { TaskPriorities, TaskStatuses } from "common/enums";
import { instance } from "common/api/api";

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
export type AddTaskArg = { todolistId: string; title: string };
export type DeleteTaskArg = { todolistId: string; taskId: string };
export type UpdateTaskArg = {
  todolistId: string;
  taskId: string;
  domainModel: UpdateTaskModelType;
};
export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
export type UpdateTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};
