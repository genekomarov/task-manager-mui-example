import {ThunkAction} from "redux-thunk"
import {ActionsTypes, AppStateType} from "./store"
import {authAPI, usersAPI} from "../api/api"
import {AuthorizationFailedException} from "../exceptions/exceptions"
import {fakeLogin} from "./authReducer"

let initialState = {
    isInitialized: false,
    initializationInProgress: false
};

type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "app/SET_INITIALIZED":
            return {
                ...state,
                isInitialized: action.isInitialized
            }
        case "app/SET_INITIALIZATION_IN_PROGRESS":
            return {
                ...state,
                initializationInProgress: action.inProgress
            }
        default:
            return state
    }
};

type ActionsType = ActionsTypes<typeof actions>
export const actions = {
    setInitialized: (isInitialized: boolean) => ({type: 'app/SET_INITIALIZED', isInitialized} as const),
    setInitializationInProgress: (inProgress: boolean) => ({
        type: 'app/SET_INITIALIZATION_IN_PROGRESS',
        inProgress
    } as const),
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const appInitializing = (): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.setInitializationInProgress(true))
        await dispatch(fakeLogin())
        setTimeout(() => {
            dispatch(actions.setInitialized(true))
        }, 2000)
    } catch (e) {
        alert(e.message)
    }
}

export default appReducer