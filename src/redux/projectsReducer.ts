import {ThunkAction} from "redux-thunk"
import {ActionsTypes, AppStateType} from "./store"
import {authAPI, projectsAPI, usersAPI} from "../api/api"
import {ProjectToUserIdsMatch, ProjectType} from "../types/types"

let initialState = {
    projects: [] as Array<ProjectType>,
    isFetching: false,
    selectedProjectId: null as number | null
};

type InitialStateType = typeof initialState


const projectsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'projects/SET_PROJECTS':
            return {
                ...state,
                projects: action.projects,
                selectedProjectId: action.selectedProjectId
            }
        case "projects/SET_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "projects/SET_SELECTED_PROJECT_IS":
            return {
                ...state,
                selectedProjectId: action.selectedProjectId
            }
        default:
            return state
    }
}

type ActionsType = ActionsTypes<typeof actions>
export const actions = {
    setProjects: (projects: Array<ProjectType>) => ({
        type: 'projects/SET_PROJECTS',
        projects,
        selectedProjectId: projects[0].id
    } as const),
    setFetching: (isFetching: boolean) => ({type: 'projects/SET_FETCHING', isFetching} as const),
    setSelectedProjectId: (selectedProjectId: number) => ({type: 'projects/SET_SELECTED_PROJECT_IS', selectedProjectId} as const),
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const getProjects = (userIds: Array<number>): ThunkType => async (dispatch) => {
    try {
        let projectIds: Array<ProjectToUserIdsMatch> = await projectsAPI.getProjectIdsByUserIds(userIds)
        let projects: Array<ProjectType> = await projectsAPI.getProjectsByIds(projectIds.map((p) => p.projectId))
        dispatch(actions.setProjects(projects))
        dispatch(actions.setFetching(false))
    }
    catch (e) {
        alert(e.message)
    }

}

export const setFetching = (isFetching: boolean): ThunkType => async (dispatch) => {
    dispatch(actions.setFetching(isFetching))
}

export default projectsReducer