import {AddTodolistAC, RemoveTodolistAC, setTodolistAC} from "../todolistsReducers";
import {TaskPriorities, TaskStatuses, TaskType, todolistApi, UpdateTaskModelType} from "../../../../api/todolist-api";
import {AppRootStateType, AppThunk} from "../../../../app/store";

export const ADD_TASK = 'ADD_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'
export const SET_TASK = 'SET_TASK'


export type TaskStateType = {
    [todolistId: string]: TaskType[]
}

export type ActionTaskType =
    ReturnType<typeof AddTaskAC>
    | ReturnType<typeof RemoveTaskAC>
    | ReturnType<typeof UpdateTaskAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof setTodolistAC>
    | ReturnType<typeof SetTaskAC>


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
        case UPDATE_TASK:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)

            }
        case "ADD-TODOLIST" :
            return {...state, [action.todolist.id]: []}
        case "REMOVE-TODOLIST":
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case "SET_TODOLIST":
            return action.todolist.reduce((acc, el) => {
                acc[el.id] = []
                return acc
            }, {...state})
        case SET_TASK:
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}
export const SetTaskAC = (tasks: TaskType[], todolistId: string) => {
    return {type: SET_TASK, tasks, todolistId} as const
}

export const AddTaskAC = (task: TaskType) => {
    return {type: ADD_TASK, task} as const
}
export const RemoveTaskAC = (todolistId: string, taskId: string) => {
    return {type: REMOVE_TASK, todolistId, taskId} as const
}

export const UpdateTaskAC = (todolistId: string, taskId: string, model: UpdateTaskModelDomainType) => {
    return {type:  UPDATE_TASK, todolistId, taskId, model} as const
}
export const fetchTaskTC = (todolistId: string): AppThunk => (dispatch) => {
    todolistApi.getTasks(todolistId).then(res => {
        dispatch(SetTaskAC(res.data.items, todolistId))
    })
}
export type DeleteTaskTCArgs = { todolistId: string, taskId: string }
export const deleteTaskTC = ({todolistId, taskId}: DeleteTaskTCArgs): AppThunk => (dispatch) => {
    todolistApi.deleteTask(todolistId, taskId).then(() => {
        dispatch(RemoveTaskAC(todolistId, taskId))
    })
}
export type CreateTaskTCArgs = { todolistId: string, title: string }
export const addTaskTC = ({todolistId, title}: CreateTaskTCArgs): AppThunk => (dispatch) => {
    todolistApi.createTask(todolistId, title).then((res) => {
            dispatch(AddTaskAC(res.data.data.item))
    })
}
export type UpdateTaskModelDomainType = {
    title?: string
    description?: string
    completed?: boolean
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}


export const UpdateTaskTC = (todolistId:string, taskId:string, domainModel: UpdateTaskModelDomainType): AppThunk =>
    (dispatch, getState: () => AppRootStateType) => {

    const state = getState().tasks
    const task = state[todolistId].find(t => t.id === taskId)
    if (!task){
        console.warn('task not found in the state ')
        return
    }

    const apiModel: UpdateTaskModelType = {
        completed: task.completed,
        status: task.status,
        title: task.title,
        startDate: task.startDate,
        description: task.description,
        deadline: task.deadline,
        priority: task.priority,
            ...domainModel
    }
    todolistApi.updateTask(todolistId, taskId, apiModel).then(() => {
        dispatch(UpdateTaskAC(todolistId, taskId, apiModel))
    })
}
