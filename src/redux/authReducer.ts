import {ThunkAction} from "redux-thunk"
import {ActionsTypes, AppStateType} from "./store"
import {authAPI, usersAPI} from "../api/api"
import {AuthorizationFailedException} from "../exceptions/exceptions"

let initialState = {
    id: null as number | null,
    email: null as string | null,
    nickname: null as string | null,
    isAuth: false
};

type InitialStateType = typeof initialState

const clientSideApiReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                id: action.id,
                email: action.email,
                nickname: action.nickname,
                isAuth: action.isAuth
            }
        default: return state
    }
};

type ActionsType = ActionsTypes<typeof actions>
export const actions = {
    setUserData: (
        id: number | null,
        email: string | null,
        nickname: string | null,
        isAuth: boolean
    ) => ({type: 'SET_USER_DATA', id, email, nickname, isAuth} as const),
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
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
}

export const logout = (): ThunkType => async (dispatch) => {
    dispatch(actions.setUserData(null, null, null, false))
}

export default clientSideApiReducer