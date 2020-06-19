import {ThunkAction} from "redux-thunk"
import {ActionsTypes, AppStateType} from "./store"
import {login, showLoginForm} from "./authReducer"
import Cookies from 'js-cookie'

type InitialStateType = typeof initialState
type ActionsType = ActionsTypes<typeof actions>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

let initialState = {
    isInitialized: false,
    errors: [] as Array<string>
};

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "app/SET_INITIALIZED":
            return {
                ...state,
                isInitialized: action.isInitialized
            }
        case "app/ADD_ERROR":
            return {
                ...state,
                errors: [
                    ...state.errors,
                    action.message
                ]
            }
        default:
            return state
    }
};

export const actions = {
    setInitialized: (isInitialized: boolean) => ({type: 'app/SET_INITIALIZED', isInitialized} as const),
    newError: (message: string) => ({type: 'app/ADD_ERROR', message} as const)
}

/**
 * Инициализация приложения
 * @return {Promise<void>}
 * */
export const appInitializing = (): ThunkType => async (dispatch) => {
    try {
        let email = Cookies.get('email')
        let password = Cookies.get('password')
        if (email && password)
            await dispatch(login(email, password))
        else {
            dispatch(showLoginForm(true))
        }
        dispatch(actions.setInitialized(true))
    } catch (e) {
        dispatch(newError(e.message + ' Ошибка инициализации'))
    }
}

/**
 * Установка ошибки
 * @param {string} message - Текст ошибки
 * @return {Promise<void>}
 * */
export const newError = (message: string): ThunkType => async (dispatch) => {
    dispatch(actions.newError(message))
}

export default appReducer