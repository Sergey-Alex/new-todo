import {FilterValueType, setTodolistAC, TodolistDomainType, todolistReducers} from './todolistsReducers'
import {v1} from 'uuid'

let todolistId1: string
let todolistId2: string
let startState: TodolistDomainType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus:"idle"},
        {id: todolistId2, title: 'What to buy', filter: 'all',  addedDate: '', order: 0, entityStatus: "idle"}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistReducers(startState, {type: 'REMOVE-TODOLIST', id: todolistId1})
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be added', () => {

    const endState = todolistReducers(startState, {
        type: 'ADD-TODOLIST',
        todolist: {
            title: 'Ggggg',
            id: '3',
            order: 2,
            addedDate: ''
        }
    })
    expect(endState[0].title).toBe('Ggggg')
    expect(endState.length).toBe(3)
})
test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist'
    const action = {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        id: todolistId2,
        title: newTodolistTitle
    }
    const endState = todolistReducers(startState, action)
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValueType = 'completed'
    const action = {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: todolistId2,
        filter: newFilter
    }
    const endState = todolistReducers(startState, action)
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
test('todolist set to the state with API', () => {
    const action = setTodolistAC(startState)

    const endState = todolistReducers([], action)

    expect(endState.length).toBe(2)
})
