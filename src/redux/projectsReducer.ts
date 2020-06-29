import {ThunkAction} from "redux-thunk"
import {InferActionsType, AppStateType} from "./store"
import {projectsAPI} from "../api/api"
import {ProjectToUserIdsMatchType, ProjectType} from "../types/types"
import {newError} from "./appReducer"

type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

let initialState = {
    projects: [] as Array<ProjectType>,
    isFetching: false,
    selectedProjectId: null as number | null
};

const projectsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'projects/SET_PROJECTS':
            return {
                ...state,
                projects: action.projects,
            }
        case "projects/SET_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "projects/SET_SELECTED_PROJECT_ID":
            return {
                ...state,
                selectedProjectId: action.selectedProjectId
            }
        default:
            return state
    }
}

export const actions = {
    setProjects: (projects: Array<ProjectType>) => ({type: 'projects/SET_PROJECTS', projects} as const),
    setFetching: (isFetching: boolean) => ({type: 'projects/SET_FETCHING', isFetching} as const),
    setSelectedProjectId: (selectedProjectId: number | null) => ({type: 'projects/SET_SELECTED_PROJECT_ID', selectedProjectId} as const),
}

/**
 * Получение проектов для указанного списка ID пользователей
 * @param {Array<number>} userIds
 * @return {Promise<void>}
 * */
export const getProjects = (userIds: Array<number>): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.setFetching(true))
        let projectIds: Array<ProjectToUserIdsMatchType> = await projectsAPI.getProjectIdsByUserIds(userIds)
        let projects: Array<ProjectType> = await projectsAPI.getProjectsByIds(projectIds.map((p) => p.projectId))
        dispatch(actions.setProjects(projects))
        dispatch(actions.setSelectedProjectId(projects[0].id))
        dispatch(actions.setFetching(false))
    }
    catch (e) {
        dispatch(newError(e.message + ' Ошибка загрузки проектов'))
    }
}

/**
 * Установка списка проектов
 * @param {Array<ProjectType>} projects
 * @return {Promise<void>}
 * */
export const setProjects = (projects: Array<ProjectType>): ThunkType => async (dispatch) => {
    dispatch(actions.setProjects(projects))
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
 * @param {number} selectedProjectId
 * @return {Promise<void>}
 * */
export const setSelectedProjectId = (selectedProjectId: number | null): ThunkType => async (dispatch) => {
    dispatch(actions.setSelectedProjectId(selectedProjectId))
}

export default projectsReducer