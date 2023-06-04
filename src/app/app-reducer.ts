export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const InitialState = {
    status: 'loading' as RequestStatusType,
    error:  null
}


export type InitialStateType = {
    status: RequestStatusType
    error: string | null
}
export type AppActionStateType  = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppError>

export const appReducer = (state: InitialStateType = InitialState, action: AppActionStateType) : InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return  state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', status} as const
}
export const setAppError = (error: string | null) => {
    return {type:'APP/SET-ERROR', error } as  const
}
