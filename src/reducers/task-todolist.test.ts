import {taskReducers, TaskStateType} from "./task-reducers";
import {AddTodolistAC, RemoveTodolistAC} from "./todolistsReducers";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";


test('new array should be added when new todolist is added', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, description: '', addedDate: '', startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, todolistId: 'todolistId1',completed: false,},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, description: '', addedDate: '', startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, todolistId: 'todolistId1', completed: false,},
            {id: '3', title: 'React', status: TaskStatuses.Completed, description: '', addedDate: '', startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, todolistId: 'todolistId1',
                completed: false,}
        ],
        'todolistId2': [
            {id: '1', title: 'bread',  status: TaskStatuses.Completed, description: '', addedDate: '', startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, todolistId: 'todolistId2',completed: false,},
            {id: '2', title: 'milk', status: TaskStatuses.Completed, description: '', addedDate: '', startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, todolistId: 'todolistId2',completed: false,},
            {id: '3', title: 'tea', status: TaskStatuses.Completed, description: '', addedDate: '', startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, todolistId: 'todolistId2',completed: false,}
        ]
    }

    const action = AddTodolistAC('new todolist')

    const endState = taskReducers(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('property with todolistId should be deleted', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS',  status: TaskStatuses.Completed, description: '', addedDate: '', startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, todolistId: 'todolistId1',completed: false,},
            {id: '2', title: 'JS',  status: TaskStatuses.Completed, description: '', addedDate: '', startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, todolistId: 'todolistId1',completed: false,},
            {id: '3', title: 'React', status: TaskStatuses.Completed, description: '', addedDate: '', startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, todolistId: 'todolistId1',completed: false,}
        ],
        'todolistId2': [
            {id: '1', title: 'bread',status: TaskStatuses.Completed, description: '', addedDate: '', startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, todolistId: 'todolistId1',completed: false,},
            {id: '2', title: 'milk', status: TaskStatuses.New, description: '', addedDate: '', startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, todolistId: 'todolistId1',completed: false,},
            {id: '3', title: 'tea',status: TaskStatuses.New, description: '', addedDate: '', startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, todolistId: 'todolistId1',completed: false,}
        ]
    }
    const action = RemoveTodolistAC('todolistId2')
    const endState = taskReducers(startState, action)
    const keys = Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
