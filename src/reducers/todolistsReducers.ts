import {FilterValueType} from "../App";
import {v1} from "uuid";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
type ActionType = {
    type: string
    [key: string]: any
}

export const todolistReducers = (state: TodoListType[], action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return  state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            let todolistNew: TodoListType = {id: v1(), title: action.title, filter: 'all'}
            return [...state, todolistNew]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title:action.title} : tl)
        default:
            throw new Error('I don\'t understand this type')
    }
}
