import {combineReducers, createStore, legacy_createStore} from "redux";
import {taskReducers} from "./task-reducers";
import {todolistReducers} from "./todolistsReducers";


const rootReducer = combineReducers({
    tasks: taskReducers,
    todolists: todolistReducers
})

export const store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store