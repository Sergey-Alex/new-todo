import {FilterValueType} from "../App";
import {v1} from "uuid";

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const ADD_TODOLIST = 'ADD-TODOLIST'
export const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
export const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TodolistActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

export const todolistReducers = (state: TodoListType[], action: TodolistActionType) : TodoListType[] => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return  state.filter(tl => tl.id !== action.id)
        case ADD_TODOLIST:
            let todolistNew: TodoListType = {id:action.todolistId, title: action.title, filter: 'all'}
            return [...state, todolistNew]
        case CHANGE_TODOLIST_TITLE:
            return state.map(tl => tl.id === action.id ? {...tl, title:action.title} : tl)
        case CHANGE_TODOLIST_FILTER:
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
           return  state
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistAT => {
    return {type: REMOVE_TODOLIST, id: todolistId} as const
}
export const AddTodolistAC = (title: string ): AddTodolistAT  => {
    return {type: ADD_TODOLIST, title, todolistId: v1() } as const
}

export const ChangeTodolistTitleAC = (todolistId:string, title: string) : ChangeTodolistTitleAT => {
    return {type: CHANGE_TODOLIST_TITLE, id: todolistId, title} as const
}

export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValueType): ChangeTodolistFilterAT => {
    return  {type: "CHANGE-TODOLIST-FILTER", id:todolistId, filter}
}


export type RemoveTodolistAT =  {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistAT = {
    type : 'ADD-TODOLIST'
    title : string
    todolistId: string
}
export type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType
}