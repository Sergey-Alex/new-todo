import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'be2a500a-b1ee-431c-ba58-ab990c928e45'
    }
})

//api
export const todolistApi = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseTodolistType>(`todo-lists/${todolistId}`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseTodolistType>(`todo-lists/${todolistId}`)
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
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todoListId}/tasks/${taskId}`, model)
    }
}

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
//auth Api
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    capture?: string
}
export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{ userId?: string }>>('auth/login', data)
    },
    me() {
        return instance.get<ResponseType<{ id: number, email: string, login: string }>>(`auth/me`)
    },
    logout(){
        return instance.delete<ResponseType<{ userId?: string }>>('auth/login')
    }
}


//type
type ResponseTodolistType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors?: Array<string>
    data: D
}

export type TaskType = {
    description: string
    addedDate: string
    todoListId: string
    id: string
    title: string
    priority: TaskPriorities
    deadline: string
    startDate: string;
    status: TaskStatuses
    order: number
    completed: boolean
}

type GetTaskResponseType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}
//types
export type UpdateTaskModelType = {
    title: string
    description: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
