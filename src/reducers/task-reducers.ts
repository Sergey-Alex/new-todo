import {AddTodolistAC, RemoveTodolistAC, setTodolistAC} from "./todolistsReducers";
import {TaskStatuses, TaskType, todolistApi} from "../api/todolist-api";
import {AppThunk} from "./store";

export const ADD_TASK = 'ADD_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'
export const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'
export const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'
export const SET_TASK = 'SET_TASK'


export type TaskStateType = {
    [todolistId: string]: TaskType[]
}

type SetTaskAT = {
    type: 'SET_TASK'
    tasks: Array<TaskType>
    todolistId: string
}

export type ActionTaskType =
    ReturnType<typeof AddTaskAC>
    | ReturnType<typeof RemoveTaskAC>
    | ReturnType<typeof ChangeTaskStatusAC>
    | ReturnType<typeof ChangeTaskTitleAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof setTodolistAC>
    | SetTaskAT


const InitialTaskState = {} as TaskStateType

export const taskReducers = (state: TaskStateType = InitialTaskState, action: ActionTaskType): TaskStateType => {
    switch (action.type) {
        case ADD_TASK: {
                return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case REMOVE_TASK:
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId].filter(tsk => tsk.id !== action.taskId)]
            }
        case CHANGE_TASK_STATUS:
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(tsk => tsk.id === action.taskId ? {...tsk, status: action.status} : tsk)
            }
        case "ADD-TODOLIST" :
            const stateCopy = {...state}
            stateCopy[action.todolist.id] = []
            return stateCopy
        case CHANGE_TASK_TITLE:
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId
                    ? {...task, title: action.title} : task)
            }
        case "REMOVE-TODOLIST":
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case "SET_TODOLIST":
            const stateCopyy = {...state}
            action.todolist.forEach(tl => {
                stateCopyy[tl.id] = []
            })
            return stateCopyy
        case SET_TASK:
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}
export const SetTaskAC = (tasks: TaskType[], todolistId: string): SetTaskAT => {
    return {type: SET_TASK, tasks, todolistId}
}

export const AddTaskAC = (task: TaskType) => {
    return {type: ADD_TASK, task} as const
}
export const RemoveTaskAC = (todolistId: string, taskId: string) => {
    return {type: REMOVE_TASK, todolistId, taskId} as const
}

export const ChangeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {type: CHANGE_TASK_TITLE, todolistId, taskId, title} as const
}
export const ChangeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return {type: CHANGE_TASK_STATUS, todolistId, taskId, status} as const
}

export const fetchTaskTC = (todolistId: string): AppThunk => (dispatch) => {
    todolistApi.getTasks(todolistId).then(res => {
        dispatch(SetTaskAC(res.data.items, todolistId))
    })
}
export type DeleteTaskTCArgs = { todolistId: string, taskId: string }
export const deleteTaskTC = ({todolistId, taskId}: DeleteTaskTCArgs): AppThunk => (dispatch) => {
    todolistApi.deleteTask(todolistId, taskId).then(res => {
        dispatch(RemoveTaskAC(todolistId, taskId))
    })
}
export type CreateTaskTCArgs = { todolistId: string, title: string }
export const addTaskTC = ({todolistId, title}: CreateTaskTCArgs): AppThunk => (dispatch) => {
    todolistApi.createTask(todolistId, title).then((res) => {
            dispatch(AddTaskAC(res.data.data.item))
    })
}
export type ChangeTaskTitleArgs = { todolistId: string, taskId: string, title: string }
export const ChangeTaskTitleTC = ({todolistId, taskId, title}: ChangeTaskTitleArgs): AppThunk => (dispatch) => {
    todolistApi.updateTaskTitle(todolistId, taskId, title).then(() => {
        dispatch(ChangeTaskTitleAC(todolistId, taskId, title))
    })
}
export type ChangeTaskStatusArgs = { todolistId: string, taskId: string, status: TaskStatuses }
export const ChangeTaskStatusTC = ({todolistId, taskId, status}: ChangeTaskStatusArgs): AppThunk => (dispatch) => {
    //
    // todolistApi.updateTaskTitle(todolistId, taskId, status).then(() => {
    //     dispatch(ChangeTaskStatusAC(todolistId, taskId, status))
    // })
}
