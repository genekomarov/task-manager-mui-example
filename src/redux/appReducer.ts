import {ThunkAction} from "redux-thunk"
import {InferActionsType, AppStateType} from "./store"
import {login, showLoginForm} from "./authReducer"
import Cookies from 'js-cookie'

// Пути адреса страницы
export type RouteType = keyof typeof ROUTE
export const ROUTE = {
    ROOT: '/',
    MY_TASKS: '/my-tasks',
    USER_TASKS: '/user',
    PAGE_404: '/404'
}

type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

let initialState = {
    isInitialized: false,
    errors: [] as Array<string>,
    route: ROUTE.ROOT
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
        case "app/SET_ROUTE":
            return {
                ...state,
                route: action.route
            }
        default:
            return state
    }
};

export const actions = {
    setInitialized: (isInitialized: boolean) => ({type: 'app/SET_INITIALIZED', isInitialized} as const),
    newError: (message: string) => ({type: 'app/ADD_ERROR', message} as const),
    setRoute: (route: string) => ({type: 'app/SET_ROUTE', route} as const)
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

/**
 * Установка текущего адреса
 * @param {string} route - Адрес страницы
 * @return {Promise<void>}
 * */
export const setRoute = (route: string): ThunkType => async (dispatch) => {
    let key: keyof typeof ROUTE
    for (key in ROUTE)
        if (ROUTE[key] === route) {
            dispatch(actions.setRoute(route))
            break
        } else dispatch(actions.setRoute('404'))
}

export default appReducer