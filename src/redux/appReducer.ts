import {ThunkAction} from "redux-thunk"
import {ActionsTypes, AppStateType} from "./store"
import {authAPI, usersAPI} from "../api/api"
import {AuthorizationFailedException} from "../exceptions/exceptions"
import {fakeLogin, login} from "./authReducer"
import Cookies from 'js-cookie'

let initialState = {
    isInitialized: false
};

type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "app/SET_INITIALIZED":
            return {
                ...state,
                isInitialized: action.isInitialized
            }
        default:
            return state
    }
};

type ActionsType = ActionsTypes<typeof actions>
export const actions = {
    setInitialized: (isInitialized: boolean) => ({type: 'app/SET_INITIALIZED', isInitialized} as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const appInitializing = (): ThunkType => async (dispatch) => {
    try {
        /*await dispatch(fakeLogin())*/
        let email = Cookies.get('email')
        let password = Cookies.get('password')
        if (email && password)
            await dispatch(login(email, password))
        else {
            alert('Ранее вы небыли авторизованы. Авторизация...')
            await dispatch(login('testuser@email.com', 'testuser_pass'))
        }

        dispatch(actions.setInitialized(true))
    } catch (e) {
        alert(e.message)
    }
}

export default appReducer