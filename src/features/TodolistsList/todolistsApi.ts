import { BaseResponseType } from "common/types";
import { instance } from "common/api/api";

export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>("todo-lists");
  },
  createTodolist(title: string) {
    return instance.post<BaseResponseType<{ item: TodolistType }>>(
      "todo-lists",
      { title: title },
    );
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponseType>(`todo-lists/${id}`);
  },
  updateTodolist(arg: UpdateTodolistParamArg) {
    return instance.put<BaseResponseType>(`todo-lists/${arg.id}`, { title: arg.title });
  },
};

export type UpdateTodolistParamArg = {id: string, title: string}