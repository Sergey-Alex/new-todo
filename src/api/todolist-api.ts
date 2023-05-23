import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'be2a500a-b1ee-431c-ba58-ab990c928e45'
    }
})


export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}


type ResponseTodolistType<D> = {
    resultCode: number
    messages: string[]
    fieldsErrors: Array<string>
    data: D
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTaskResponseType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

type ResponseTaskType<D> = {
    resultCode: number
    messages: string[]
    data: D
}

export type UpdateTaskTypeRequest = {
    title: string
    description: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export const todolistApi = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseTodolistType<{}>>(`todo-lists/${todolistId}`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseTodolistType<{}>>(`todo-lists/${todolistId}`)
    },
    getTodolistAll() {
        return instance.get<TodoListType[]>(`todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseTodolistType<{ item: TodoListType }>>(`todo-lists`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseTaskType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseTaskType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTaskTitle(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseTaskType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
    }


}