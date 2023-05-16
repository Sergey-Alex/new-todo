import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'be2a500a-b1ee-431c-ba58-ab990c928e45'
    }
})


export const todolistApi = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put(`todo-lists/${todolistId}`, title)
    },
    deleteTodolist(todolistId: string) {
        return instance.delete(`todo-lists/${todolistId}`)
    },
    getTodolistAll() {
        return instance.get(`todo-lists`)
    },
    getTodolist(todolistId: string) {
        return instance.get(`todo-lists/${todolistId}`)
    },
    createTodolist(title: string){
        return instance.post(`todo-lists`,{title})
    }

}