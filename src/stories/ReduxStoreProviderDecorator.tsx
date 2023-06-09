import React from 'react'
import {Provider} from "react-redux";
import {AppRootStateType} from '../app/store'
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import { taskReducers } from '../features/TodolistsLists/Todolist/Tasks/task-reducers';
import {todolistReducers} from "../features/TodolistsLists/Todolist/todolistsReducers";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";
import {appReducer} from "../app/app-reducer";
import thunkMiddleware from "redux-thunk";


const rootReducer = combineReducers({
    tasks: taskReducers,
    todolists: todolistReducers,
    app: appReducer
})


const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: 'loading'}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.New, description: '', addedDate: '', startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, todoListId: 'todolistId1',completed: false},
            {id: v1(), title: "JS", status: TaskStatuses.New, description: '', addedDate: '', startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, todoListId: 'todolistId1', completed: false}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.New, description: '', addedDate: '', startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, todoListId: 'todolistId2', completed: false},
            {id: v1(), title: "React Book", status: TaskStatuses.New, description: '', addedDate: '', startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, todoListId: 'todolistId2', completed: false}
        ]
    },
    app: {
        status: 'idle',
        error: null,
        isInitialized: false
    },
    auth: {
        isLoggedIn: false
    }

};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType,applyMiddleware(thunkMiddleware));


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
