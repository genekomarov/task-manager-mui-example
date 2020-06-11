import {ThunkAction} from "redux-thunk"
import {ActionsTypes, AppStateType} from "./store"
import {authAPI, usersAPI} from "../api/api"
import {AuthorizationFailedException} from "../exceptions/exceptions"

let initialState = {
    isInitialized: false
};

type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
            }
        default: return state
    }
};

type ActionsType = ActionsTypes<typeof actions>
export const actions = {
    setUserData: () => ({type: 'SET_USER_DATA'} as const),
}

/*type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const login = (email: string, password: string): ThunkType => async (dispatch) => {
    try {
        let authData = await authAPI.auth(email, password)
        if (authData.length === 0) throw new AuthorizationFailedException()
        let extraData = await usersAPI.getUsersByIds([authData[0].id])
        if (authData.length === 0) throw new AuthorizationFailedException()
        dispatch(actions.setUserData(authData[0].id, authData[0].email, extraData[0].nickname, true))
    }
    catch (e) {
        alert(e.message)
    }
}*/


export default appReducer