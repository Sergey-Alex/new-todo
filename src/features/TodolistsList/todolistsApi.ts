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
    return instance.delete<ResponseType>(`todo-lists/${id}`);
  },
  updateTodolist(id: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${id}`, { title: title });
  },
};
