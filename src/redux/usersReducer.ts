import {ThunkAction} from "redux-thunk"
import {ActionsTypes, AppStateType} from "./store"
import {authAPI, projectsAPI, usersAPI} from "../api/api"
import {ProjectToUserIdsMatch, ProjectType, UserType} from "../types/types"

let initialState = {
    users: [] as Array<UserType>,
    isFetching: true
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
        default:
            return state
    }
}

type ActionsType = ActionsTypes<typeof actions>
export const actions = {
    setUsers: (users: Array<UserType>) => ({type: 'users/SET_USERS', users} as const),
    setFetching: (isFetching: boolean) => ({type: 'users/SET_FETCHING', isFetching} as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const getUsers = (projectIds: Array<number>): ThunkType => async (dispatch) => {
    try {
        let userIds: Array<ProjectToUserIdsMatch> = await usersAPI.getUserIdsByProjectIds(projectIds)
        let users: Array<UserType> = await usersAPI.getUsersByIds(userIds.map((u) => u.userId))
        dispatch(actions.setUsers(users))
    }
    catch (e) {
        alert(e.message)
    }

}

export default usersReducer