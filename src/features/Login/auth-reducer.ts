import {AppThunk} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
const IS_LOGIN_IN = 'login/IS_LOGIN_IN'
type StateDefaultType = {
    isLoggedIn: boolean
}
export type ActionAuthType = ReturnType<typeof setIsLoggedInAC>
const InitialStateAuth: StateDefaultType = {
    isLoggedIn: false
}

export const authReducer  = (state = InitialStateAuth, action: ActionAuthType): StateDefaultType  => {
    switch (action.type){
        case IS_LOGIN_IN:
            return  {...state, isLoggedIn: action.isLoggedIn}
        default:
            return  state
    }
}

export const setIsLoggedInAC = (isLoggedIn: boolean) => {
    return {type: IS_LOGIN_IN, isLoggedIn} as const
}

export const loginTC = (params:LoginParamsType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(params).then(res => {
        if (res.data.resultCode === 0){
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })

}

