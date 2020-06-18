import {ThunkAction} from "redux-thunk"
import {ActionsTypes, AppStateType} from "./store"
import {authAPI, usersAPI} from "../api/api"
import {AuthorizationFailedException} from "../exceptions/exceptions"
import {fakeLogin, login, showLoginForm} from "./authReducer"
import Cookies from 'js-cookie'

let initialState = {
    isInitialized: false,
    errors: [] as Array<string>
};

type InitialStateType = typeof initialState

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

type ActionsType = ActionsTypes<typeof actions>
export const actions = {
    setInitialized: (isInitialized: boolean) => ({type: 'app/SET_INITIALIZED', isInitialized} as const),
    newError: (message: string) => ({type: 'app/ADD_ERROR', message} as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
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

export const newError = (message: string): ThunkType => async (dispatch) => {
    dispatch(actions.newError(message))
}

export default appReducer