
import {todolistApi, TodoListType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppActionsType, AppThunk} from "./store";


export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const ADD_TODOLIST = 'ADD-TODOLIST'
export const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
export const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'
export const SET_TODOLIST = 'SET_TODOLIST'


export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodoListType & {
    filter: FilterValueType
}


export type TodolistActionType =
    RemoveTodolistAT
    | AddTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilterAT
    | ReturnType<typeof setTodolistAC>

const InitialTodolistState: TodolistDomainType[] = []

export const todolistReducers = (state: TodolistDomainType[] = InitialTodolistState, action: TodolistActionType): TodolistDomainType[] => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter(tl => tl.id !== action.id)
        case ADD_TODOLIST:
            return [{...action.todolist, filter: 'all'}, ...state]
        case CHANGE_TODOLIST_TITLE:
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case CHANGE_TODOLIST_FILTER:
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case SET_TODOLIST:
            return action.todolist.map(tl => ({...tl, filter: 'all'}));
        default:
            return state
    }
}

export const setTodolistAC = (todolist: TodoListType[]) => {
    return {type: SET_TODOLIST, todolist} as const
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistAT => {
    return {type: REMOVE_TODOLIST, id: todolistId} as const
}
export const AddTodolistAC = (todolist: TodoListType): AddTodolistAT => {
    return {type: ADD_TODOLIST, todolist} as const
}

export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleAT => {
    return {type: CHANGE_TODOLIST_TITLE, id: todolistId, title} as const
}

export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValueType): ChangeTodolistFilterAT => {
    return {type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter}
}


export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    todolist: TodoListType
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

export const fetchTodolistTC = (): AppThunk => (dispatch: Dispatch<AppActionsType>) => {
    todolistApi.getTodolistAll().then(res => {
        dispatch(setTodolistAC(res.data))
    })
}

export const deleteTodolistTC = (todoListId: string): AppThunk => (dispatch) => {
    todolistApi.deleteTodolist(todoListId).then(() => {
        dispatch(RemoveTodolistAC(todoListId))
    })
}
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    todolistApi.createTodolist(title).then((res) => {
        dispatch(AddTodolistAC(res.data.data.item))
    })
}
export type ChangeTodolistTitleArgs = { todoListId: string, title: string }
export const ChangeTodolistTitleTC = ({todoListId, title}: ChangeTodolistTitleArgs ): AppThunk => (dispatch) => {
    todolistApi.updateTodolist(todoListId, title).then((res) => {
        dispatch(ChangeTodolistTitleAC(todoListId, title))
    })
}
