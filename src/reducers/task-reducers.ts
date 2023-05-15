import {v1} from "uuid";
import {AddTodolistAC, RemoveTodolistAC} from "./todolistsReducers";
import {todolistId1, todolistId2} from "./todolistsReducers";

export const ADD_TASK = 'ADD_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'
export const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'
export const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TaskStateType = {
    [todolistId: string]: TaskType[]
}
export type ActionTaskType =
    ReturnType<typeof AddTaskAC>
    | ReturnType<typeof RemoveTaskAC>
    | ReturnType<typeof ChangeTaskStatusAC>
    | ReturnType<typeof ChangeTaskTitleAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof RemoveTodolistAC>



const InitialTaskState = {
    [todolistId1]: [

    ],
    [todolistId2]: [

    ]
}


export const taskReducers = (state: TaskStateType = InitialTaskState , action: ActionTaskType): TaskStateType => {
    switch (action.type) {
        case ADD_TASK:
            const newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        case REMOVE_TASK:
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId].filter(tsk => tsk.id !== action.taskId)]
            }
        case CHANGE_TASK_STATUS:
        return {...state, [action.todolistId] : state[action.todolistId]
                .map(tsk => tsk.id === action.taskId ? {...tsk, isDone: action.isDone} : tsk)}
        case "ADD-TODOLIST" :
            const stateCopy = {...state}
                stateCopy[action.todolistId] = []
            return  stateCopy
        case CHANGE_TASK_TITLE:
            return {
                ...state, [action.todolistId]:state[action.todolistId].map(task => task.id === action.taskId
                    ? {...task, title: action.title} : task)
            }
        case "REMOVE-TODOLIST":
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
            return state
    }
}

export const AddTaskAC = (todolistId: string, title: string) => {
    return {type: ADD_TASK, todolistId, title} as const
}
export const RemoveTaskAC = (todolistId: string, taskId: string) => {
    return {type: REMOVE_TASK, todolistId, taskId} as const
}

export const ChangeTaskTitleAC = (todolistId :string, taskId: string, title: string) => {
    return {type: CHANGE_TASK_TITLE, todolistId, taskId, title} as const
}
export const ChangeTaskStatusAC = (todolistId :string, taskId: string, isDone: boolean) => {
    return {type: CHANGE_TASK_STATUS, todolistId, taskId, isDone} as const
}