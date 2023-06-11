
import {appReducer, InitialStateType, setAppError, setAppStatusAC} from "./app-reducer";

let startState: InitialStateType

beforeEach(() => {

    startState = {
        error: null,
        status: "idle",
        isInitialized: false
    }
})

test('correct error message should be', () => {

    const endState = appReducer(startState, setAppError('some error'))
    expect(endState.error).toBe('some error')
})
test('correct status message should be set', () => {

    const endState = appReducer(startState, setAppStatusAC('failed'))
    expect(endState.status).toBe('failed')
})

