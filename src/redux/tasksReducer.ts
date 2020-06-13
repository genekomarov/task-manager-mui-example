import {ThunkAction} from "redux-thunk"
import {ActionsTypes, AppStateType} from "./store"
import {authAPI, projectsAPI, tasksAPI, usersAPI} from "../api/api"
import {ProjectToUserIdsMatch, ProjectType, TaskFilterType, TaskType, UserType} from "../types/types"

let initialState = {
    tasks: [] as Array<TaskType>,
    isFetching: false,
    filter: {
        userIds: [] as Array<number>,
        status: null as boolean | null,
        content: "",
    } as TaskFilterType,
    sort: {},
    countOfShownTasks: 0
};

type InitialStateType = typeof initialState


const tasksReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "tasks/SET_TASKS":
            return {
                ...state,
                tasks: action.tasks
            }
        case "tasks/SET_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "tasks/SET_FILTER":
            return {
                ...state,
                filter: action.filter
            }
        case "tasks/SET_COUNT_OF_SHOWN_TASKS":
            return {
                ...state,
                countOfShownTasks: action.countOfShownTasks
            }
        default:
            return state
    }
};

type ActionsType = ActionsTypes<typeof actions>
export const actions = {
    setTasks: (tasks: Array<TaskType>) => ({type: 'tasks/SET_TASKS', tasks} as const),
    setFetching: (isFetching: boolean) => ({type: 'tasks/SET_FETCHING', isFetching} as const),
    setFilter: (filter: TaskFilterType) => ({type: 'tasks/SET_FILTER', filter} as const),
    setCountOfShownTasks: (countOfShownTasks: number) => ({
        type: 'tasks/SET_COUNT_OF_SHOWN_TASKS',
        countOfShownTasks
    } as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const getTasks = (
    projectIds: Array<number> | null,
    userIds: Array<number> | null
): ThunkType => async (dispatch) => {
    try {
        let tasks = await tasksAPI.getTasksByProjectOrUserIds(projectIds, userIds)
        dispatch(actions.setTasks(tasks))
        dispatch(actions.setFilter({userIds: [], status: null, content: ""}))
        dispatch(actions.setFetching(false))
    } catch (e) {
        alert(e.message)
    }
}

export const setFetching = (isFetching: boolean): ThunkType => async (dispatch) => {
    dispatch(actions.setFetching(isFetching))
}

export const setFilter = (filter: TaskFilterType): ThunkType => async (dispatch) => {
    dispatch(actions.setFilter(filter))
}

export const setCountOfShownTasks = (countOfShownTasks: number): ThunkType => async (dispatch) => {
    dispatch(actions.setCountOfShownTasks(countOfShownTasks))
}

export default tasksReducer