import {ThunkAction} from "redux-thunk"
import {InferActionsType, AppStateType} from "./store"
import {usersAPI} from "../api/api"
import {ProjectToUserIdsMatchType, UserType} from "../types/types"
import {newError} from "./appReducer"

type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

let initialState = {
    users: [] as Array<UserType>,
    isFetching: false,
    selectedUserId: null as number | null
};

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

export const actions = {
    setUsers: (users: Array<UserType>) => ({type: 'users/SET_USERS', users} as const),
    setFetching: (isFetching: boolean) => ({type: 'users/SET_FETCHING', isFetching} as const),
    setSelectedUserId: (selectedUserId: number | null) => ({type: 'users/SET_SELECTED_USER_ID', selectedUserId} as const)
}

/**
 * Получение пользователей для указанного списка ID проектов
 * @param {Array<number>} projectIds
 * @return {Promise<void>}
 * */
export const getUsersByProjectIds = (projectIds: Array<number>): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.setFetching(true))
        let userIds: Array<ProjectToUserIdsMatchType> = await usersAPI.getUserIdsByProjectIds(projectIds)
        let users: Array<UserType> = await usersAPI.getUsersByIds(userIds.map((u) => u.userId))
        await dispatch(setUsers(users))
    } catch (e) {
        dispatch(newError(e.message + ' Ошибка загрузки команды пользователей'))
    }
}

/**
 * Получение пользователей по их ID
 * @param {Array<number>} userIds
 * @return {Promise<void>}
 * */
export const getUsersByIds = (userIds: Array<number>): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.setFetching(true))
        let users: Array<UserType> = await usersAPI.getUsersByIds(userIds)
        await dispatch(setUsers(users))
    } catch (e) {
        dispatch(newError(e.message + ' Ошибка загрузки команды пользователей'))
    }
}

/**
 * Установка флага получения данных
 * @param {boolean} isFetching
 * @return {Promise<void>}
 * */
export const setFetching = (isFetching: boolean): ThunkType => async (dispatch) => {
    dispatch(actions.setFetching(isFetching))
}

/**
 * Установка значения ID выбранного проекта
 * @param {number | null} selectedUserId
 * @return {Promise<void>}
 * */
export const setSelectedUserId = (selectedUserId: number | null): ThunkType => async (dispatch) => {
    dispatch(actions.setSelectedUserId(selectedUserId))
}

/**
 * Установка списка пользователей
 * @param {Array<UserType>} users
 * @return {Promise<void>}
 * */
export const setUsers = (users: Array<UserType>): ThunkType => async (dispatch) => {
    dispatch(actions.setUsers(users))
    dispatch(actions.setFetching(false))
}

export default usersReducer