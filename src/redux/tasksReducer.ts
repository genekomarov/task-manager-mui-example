import {ThunkAction} from "redux-thunk"
import {ActionsTypes, AppStateType} from "./store"
import {authAPI, projectsAPI, tasksAPI, usersAPI} from "../api/api"
import {ProjectToUserIdsMatch, ProjectType, TaskFilterType, TaskSortType, TaskType, UserType} from "../types/types"

let initialState = {
    tasks: [] as Array<TaskType>,
    isFetching: false,
    filter: {
        userIds: null as Array<number> | null,
        status: null as boolean | null,
        content: null as string | null,
    } as TaskFilterType,
    sort: {
        firstCompleted: null as boolean | null,
        firstNew: null as boolean | null
    } as TaskSortType,
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
                filter: {
                    ...state.filter,
                    userIds: action.filter.userIds === undefined
                        ? state.filter.userIds
                        : action.filter.userIds === null
                            ? null
                            : state.filter.userIds
                                ? [...state.filter.userIds, ...action.filter.userIds]
                                : [...action.filter.userIds],
                    status: action.filter.status === undefined
                        ? state.filter.status
                        : action.filter.status,
                    content: action.filter.content === undefined
                        ? state.filter.content
                        : action.filter.content
                }
            }
            case "tasks/SET_SORT":
                return {
                    ...state,
                    sort: {
                        ...state.sort,
                        firstCompleted: action.sort.firstCompleted === undefined
                            ? state.sort.firstCompleted
                            : action.sort.firstCompleted,
                        firstNew: action.sort.firstNew === undefined
                            ? state.sort.firstNew
                            : action.sort.firstNew
                    }
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
    setSort: (sort: TaskSortType) => ({type: 'tasks/SET_SORT', sort} as const),
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

export const setFilter = (filter: TaskFilterType, rewrite = false): ThunkType => async (dispatch) => {
    if (rewrite) dispatch(actions.setFilter({
        userIds: filter.userIds !== undefined ? null : undefined,
        status: filter.status !== undefined ? null : undefined,
        content: filter.content !== undefined ? null : undefined,
    }))
    dispatch(actions.setFilter(filter))
}

export const setSort = (sort: TaskSortType): ThunkType => async (dispatch) => {
    dispatch(actions.setSort(sort))
}

export const setCountOfShownTasks = (countOfShownTasks: number): ThunkType => async (dispatch) => {
    dispatch(actions.setCountOfShownTasks(countOfShownTasks))
}

export default tasksReducer