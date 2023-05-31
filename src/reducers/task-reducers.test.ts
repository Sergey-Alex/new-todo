import {AddTaskAC, ChangeTaskStatusAC, RemoveTaskAC, SetTaskAC, taskReducers, TaskStateType} from "./task-reducers";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";
import {setTodolistAC} from "./todolistsReducers";

let startState: TaskStateType
beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                addedDate: '',
                description: '',
                todoListId: 'todolistId1',
                id: '1',
                title: 'React',
                priority: TaskPriorities.Low,
                deadline: '',
                startDate: '',
                status: TaskStatuses.New,
                order: 1,
                completed: false,
            },
            {
                addedDate: '',
                description: '',
                todoListId: 'todolistId1',
                id: '2',
                title: 'React',
                priority: TaskPriorities.Low,
                deadline: '',
                startDate: '',
                status: TaskStatuses.New,
                order: 1,
                completed: false,
            },
            {
                addedDate: '',
                description: '',
                todoListId: 'todolistId1',
                id: '3',
                title: 'React',
                priority: TaskPriorities.Low,
                deadline: '',
                startDate: '',
                status: TaskStatuses.New,
                order: 1,
                completed: false,
            }
        ],
        'todolistId2': [
            {
                addedDate: '',
                description: '',
                todoListId: 'todolistId2',
                id: '1',
                title: 'React',
                priority: TaskPriorities.Low,
                deadline: '',
                startDate: '',
                status: TaskStatuses.New,
                order: 1,
                completed: false,
            },
            {
                addedDate: '',
                description: '',
                todoListId: 'todolistId2',
                id: '1',
                title: 'React',
                priority: TaskPriorities.Low,
                deadline: '',
                startDate: '',
                status: TaskStatuses.New,
                order: 1,
                completed: false,
            },
            {
                addedDate: '',
                description: '',
                todoListId: 'todolistId2',
                id: '3',
                title: 'React',
                priority: TaskPriorities.Low,
                deadline: '',
                startDate: '',
                status: TaskStatuses.New,
                order: 1,
                completed: false,
            }
        ]
    }
})


test('correct task should be added to correct array', () => {
    const action = AddTaskAC({
        todoListId: 'todolistId',
        title: 'juce',
        id: '2',
        completed: false,
        deadline: '',
        status: TaskStatuses.New,
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        addedDate: '',
        description: ''

    })
    const endState = taskReducers(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('React')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})


test('correct task should be deleted from correct array', () => {
    const action = RemoveTaskAC('todolistId1', '2')
    const endState = taskReducers(startState, action)

    expect(endState['todolistId1'].length).toBe(2)
})

test('status of specified task should be changed', () => {
    const action = ChangeTaskStatusAC('todolistId2', '2', TaskStatuses.New)
    const endState = taskReducers(startState, action)
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
    expect(endState['todolistId1'][0].status).toBe(TaskStatuses.New)
})
test('set todolist, create array task', () => {

    const action = setTodolistAC( [
        {id: '1', title: 'What to learn', addedDate: '', order: 0},
        {id: '2', title: 'What to buy',  addedDate: '', order: 0}
    ])
    const endState = taskReducers({}, action)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])

})
test('tasks should be added todolist', () => {

    const action = SetTaskAC(startState['todolistId1'], 'todolistId1')
    const endState = taskReducers({
        'todolistId1': [],
        'todolistId2': []
    }, action)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(0)


})