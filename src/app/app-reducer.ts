export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const InitialState = {
    status: 'loading' as RequestStatusType
}

export type InitialStateType = typeof InitialState
export type AppActionStateType  = ReturnType<typeof setAppStatusAC>

export const appReducer = (state: InitialStateType = InitialState, action: AppActionStateType) : InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        default:
            return  state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', status} as const
}

