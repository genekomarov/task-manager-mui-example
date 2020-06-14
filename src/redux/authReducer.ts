import {ThunkAction} from "redux-thunk"
import {ActionsTypes, AppStateType} from "./store"
import {authAPI, usersAPI} from "../api/api"
import {AuthorizationFailedException} from "../exceptions/exceptions"
import Cookies from 'js-cookie'

let initialState = {
    id: null as number | null,
    email: null as string | null,
    nickname: null as string | null,
    isAuth: false,
    loginFormShown: false,
    loginErrorMessage: null as string | null
};

type InitialStateType = typeof initialState

const clientSideApiReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "auth/SET_USER_DATA":
            return {
                ...state,
                id: action.id,
                email: action.email,
                nickname: action.nickname,
                isAuth: action.isAuth
            }
        case "auth/SHOW_LOGIN_FORM":
            return {
                ...state,
                loginFormShown: action.loginFormShown
            }
            case "auth/SET_LOGIN_ERROR_MESSAGE":
                return {
                    ...state,
                    loginErrorMessage: action.loginErrorMessage
                }
        default:
            return state
    }
}

type ActionsType = ActionsTypes<typeof actions>
export const actions = {
    setUserData: (
        id: number | null,
        email: string | null,
        nickname: string | null,
        isAuth: boolean
    ) => ({type: 'auth/SET_USER_DATA', id, email, nickname, isAuth} as const),
    showLoginForm: (loginFormShown: boolean) => ({type: 'auth/SHOW_LOGIN_FORM', loginFormShown} as const),
    setLoginErrorMessage: (loginErrorMessage: string | null) => ({type: 'auth/SET_LOGIN_ERROR_MESSAGE', loginErrorMessage} as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const login = (email: string, password: string): ThunkType => async (dispatch) => {
    try {
        let authData = await authAPI.auth(email, password)
        if (authData.length === 0) throw new AuthorizationFailedException()
        let extraData = await usersAPI.getUsersByIds([authData[0].id])
        if (authData.length === 0) throw new AuthorizationFailedException()
        dispatch(actions.setUserData(authData[0].id, authData[0].email, extraData[0].nickname, true))
        dispatch(actions.showLoginForm(false))
        dispatch(actions.setLoginErrorMessage(null))
        Cookies.set('email',  email)
        Cookies.set('password', password)
    }
    catch (e) {
        dispatch(actions.setLoginErrorMessage('Неправильно введены email или password!'))
    }
}

export const fakeLogin = (): ThunkType => async (dispatch) => {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                dispatch(actions.setUserData(0, 'testuser@email.com', 'testuser', true))
                resolve()
            } ,2000)
        }
        catch (e) {
            alert(e.message)
            reject()
        }
    })
}

export const logout = (): ThunkType => async (dispatch) => {
    Cookies.remove('email')
    Cookies.remove('password')
    dispatch(actions.setUserData(null, null, null, false))
}

export const showLoginForm = (loginFormShown: boolean): ThunkType => async (dispatch) => {
    dispatch(actions.showLoginForm(loginFormShown))
}

export const setLoginErrorMessage = (loginErrorMessage: string | null): ThunkType => async (dispatch) => {
    dispatch(actions.setLoginErrorMessage(loginErrorMessage))
}

export default clientSideApiReducer