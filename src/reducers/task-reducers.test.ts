import {AddTaskAC, ChangeTaskStatusAC, RemoveTaskAC, taskReducers, TaskStateType} from "./task-reducers";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

let startState: TaskStateType
beforeEach(() => {
    startState = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, description: '', addedDate: '', startDate: '', completed: false, deadline: '', order: 0, priority: TaskPriorities.Low, todoListId: 'todolistId1'},
            {id: '2', title: 'JS', status: TaskStatuses.New, description: '', addedDate: '', startDate: '', completed: false, deadline: '', order: 0, priority: TaskPriorities.Low, todoListId: 'todolistId1'},
            {id: '3', title: 'React', status: TaskStatuses.Completed, description: '', addedDate: '', startDate: '', completed: false, deadline: '', order: 0, priority: TaskPriorities.Low, todoListId: 'todolistId1'}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.Completed, description: '', addedDate: '', startDate: '', completed: false, deadline: '', order: 0, priority: TaskPriorities.Low, todoListId: 'todolistId2'},
            {id: '2', title: 'milk', status: TaskStatuses.Completed, description: '', addedDate: '', startDate: '', completed: false, deadline: '', order: 0, priority: TaskPriorities.Low, todoListId:'todolistId2' },
            {id: '3', title: 'tea', status: TaskStatuses.Completed, description: '', addedDate: '', startDate: '', completed: false, deadline: '', order: 0, priority: TaskPriorities.Low, todoListId:'todolistId2' }
        ]
    }
})


test('correct task should be added to correct array', () => {
    const action = AddTaskAC( 'todolistId2', 'juce')
    const endState = taskReducers(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})


test('correct task should be deleted from correct array', () => {
    const action = RemoveTaskAC( 'todolistId2','2')
    const endState = taskReducers(startState, action)
    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, description: '', addedDate: '', startDate: '', completed: false, deadline: '', order: 0, priority: TaskPriorities.Low, todoListId: 'todolistId1'},
            {id: '2', title: 'JS', status: TaskStatuses.New, description: '', addedDate: '', startDate: '', completed: false, deadline: '', order: 0, priority: TaskPriorities.Low, todoListId: 'todolistId1'},
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.Completed, description: '', addedDate: '', startDate: '', completed: false, deadline: '', order: 0, priority: TaskPriorities.Low, todoListId: 'todolistId2'},
            {id: '2', title: 'milk', status: TaskStatuses.Completed, description: '', addedDate: '', startDate: '', completed: false, deadline: '', order: 0, priority: TaskPriorities.Low, todoListId:'todolistId2' },
            {id: '3', title: 'tea', status: TaskStatuses.Completed, description: '', addedDate: '', startDate: '', completed: false, deadline: '', order: 0, priority: TaskPriorities.Low, todoListId:'todolistId2' }
        ]
    })
})

test('status of specified task should be changed', () => {
    const action = ChangeTaskStatusAC( 'todolistId2','2', TaskStatuses.New)
    const endState = taskReducers(startState, action)
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
     expect(endState['todolistId1'][1].status).toBe(TaskStatuses.New)
})
