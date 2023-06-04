import {todolistApi, TodoListType} from "../../../api/todolist-api";
import {Dispatch} from "redux";
import {AppActionsType, AppThunk} from "../../../app/store";
import {RequestStatusType, setAppStatusAC} from "../../../app/app-reducer";


export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const ADD_TODOLIST = 'ADD-TODOLIST'
export const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
export const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'
export const SET_TODOLIST = 'SET_TODOLIST'


export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodoListType & {
    filter: FilterValueType,
    entityStatus:  RequestStatusType
}


export type TodolistActionType =
    ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof ChangeTodolistFilterAC>
    | ReturnType<typeof setTodolistAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>

const InitialTodolistState: TodolistDomainType[] = []

export const todolistReducers = (state: TodolistDomainType[] = InitialTodolistState, action: TodolistActionType): TodolistDomainType[] => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter(tl => tl.id !== action.id)
        case ADD_TODOLIST:
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case CHANGE_TODOLIST_TITLE:
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case CHANGE_TODOLIST_FILTER:
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case SET_TODOLIST:
            return action.todolist.map(tl => ({...tl, filter: 'all', entityStatus:'idle'}));
        case 'CHANGE-TODOLIST-ENTITY-STATUS' :
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status}: tl)
        default:
            return state
    }
}

export const setTodolistAC = (todolist: TodoListType[]) => {
    return {type: SET_TODOLIST, todolist} as const
}
export const RemoveTodolistAC = (todolistId: string) => {
    return {type: REMOVE_TODOLIST, id: todolistId} as const
}
export const AddTodolistAC = (todolist: TodoListType) => {
    return {type: ADD_TODOLIST, todolist} as const
}

export const ChangeTodolistTitleAC = (todolistId: string, title: string) => {
    return {type: CHANGE_TODOLIST_TITLE, id: todolistId, title} as const
}

export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValueType) => {
    return {type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter} as const
}
export const changeTodolistEntityStatusAC  = (id: string, status: RequestStatusType) => {
    return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', id , status} as const
}

export const fetchTodolistTC = (): AppThunk => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.getTodolistAll().then(res => {
        dispatch(setTodolistAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    })
}

export const deleteTodolistTC = (todoListId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todoListId,'loading'))
    todolistApi.deleteTodolist(todoListId).then(() => {
        dispatch(RemoveTodolistAC(todoListId))
        dispatch(setAppStatusAC('succeeded'))
    })
}
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.createTodolist(title).then((res) => {
        dispatch(AddTodolistAC(res.data.data.item))
        dispatch(setAppStatusAC('succeeded'))
    })
}
export type ChangeTodolistTitleArgs = { todoListId: string, title: string }
export const ChangeTodolistTitleTC = ({todoListId, title}: ChangeTodolistTitleArgs): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.updateTodolist(todoListId, title).then(() => {
        dispatch(ChangeTodolistTitleAC(todoListId, title))
        dispatch(setAppStatusAC('succeeded'))
    })
}

