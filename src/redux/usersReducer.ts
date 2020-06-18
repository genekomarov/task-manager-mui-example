import {ThunkAction} from "redux-thunk"
import {ActionsTypes, AppStateType} from "./store"
import {authAPI, projectsAPI, usersAPI} from "../api/api"
import {ProjectToUserIdsMatch, ProjectType, UserType} from "../types/types"
import {useSnackbar} from "notistack"
import {newError} from "./appReducer"

let initialState = {
    users: [] as Array<UserType>,
    isFetching: false,
    selectedUserId: null as number | null
};

type InitialStateType = typeof initialState


const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "users/SET_USERS":
            return {
                ...state,
                users: action.users
            }
        case "users/SET_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "users/SET_SELECTED_USER_ID":
            return {
                ...state,
                selectedUserId: action.selectedUserId
            }
        default:
            return state
    }
}

type ActionsType = ActionsTypes<typeof actions>
export const actions = {
    setUsers: (users: Array<UserType>) => ({type: 'users/SET_USERS', users} as const),
    setFetching: (isFetching: boolean) => ({type: 'users/SET_FETCHING', isFetching} as const),
    setSelectedUserId: (selectedUserId: number | null) => ({type: 'users/SET_SELECTED_USER_ID', selectedUserId} as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const getUsers = (projectIds: Array<number>): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.setFetching(true))
        let userIds: Array<ProjectToUserIdsMatch> = await usersAPI.getUserIdsByProjectIds(projectIds)
        let users: Array<UserType> = await usersAPI.getUsersByIds(userIds.map((u) => u.userId))
        dispatch(actions.setUsers(users))
        dispatch(actions.setFetching(false))
    } catch (e) {
        dispatch(newError(e.message + ' Ошибка загрузки команды пользователей'))
    }

}

export const setFetching = (isFetching: boolean): ThunkType => async (dispatch) => {
    dispatch(actions.setFetching(isFetching))
}

export const setSelectedUserId = (selectedUserId: number | null): ThunkType => async (dispatch) => {
    dispatch(actions.setSelectedUserId(selectedUserId))
}

export default usersReducer