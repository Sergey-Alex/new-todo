import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {ActionTaskType, taskReducers} from "./task-reducers";
import {TodolistActionType, todolistReducers} from "./todolistsReducers";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    tasks: taskReducers,
    todolists: todolistReducers
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionsType = ActionTaskType | TodolistActionType
export const useAppDispatch = () => useDispatch<ThunkDispatch<AppRootStateType, unknown, AppActionsType>>()
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

//@ts-ignore
window.store = store