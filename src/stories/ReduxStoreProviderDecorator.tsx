import React from 'react'
import {Provider} from "react-redux";
import {AppRootStateType} from '../reducers/store'
import {combineReducers, legacy_createStore} from "redux";
import { taskReducers } from '../reducers/task-reducers';
import {todolistReducers} from "../reducers/todolistsReducers";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

const rootReducer = combineReducers({
    tasks: taskReducers,
    todolists: todolistReducers
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.New, description: '', addedDate: '', startDate: '', completed: false, deadline: '', order: 0, priority: TaskPriorities.Low, todoListId: 'todolistId1'},
            {id: v1(), title: "JS", status: TaskStatuses.New, description: '', addedDate: '', startDate: '', completed: false, deadline: '', order: 0, priority: TaskPriorities.Low, todoListId: 'todolistId1'}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.New, description: '', addedDate: '', startDate: '', completed: false, deadline: '', order: 0, priority: TaskPriorities.Low, todoListId: 'todolistId2'},
            {id: v1(), title: "React Book", status: TaskStatuses.New, description: '', addedDate: '', startDate: '', completed: false, deadline: '', order: 0, priority: TaskPriorities.Low, todoListId: 'todolistId2'}
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
