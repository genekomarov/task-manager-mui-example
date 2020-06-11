import {ThunkAction} from "redux-thunk"
import {ActionsTypes, AppStateType} from "./store"
import {authAPI, projectsAPI, usersAPI} from "../api/api"
import {ProjectToUserIdsMatch, ProjectType} from "../types/types"

let initialState = {
    projects: [] as Array<ProjectType>,
    isFetching: true
};

type InitialStateType = typeof initialState


const projectsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'projects/SET_PROJECTS':
            return {
                ...state,
                projects: action.projects
            }
        case "projects/SET_FETCHING":
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
    setProjects: (projects: Array<ProjectType>) => ({type: 'projects/SET_PROJECTS', projects} as const),
    setFetching: (isFetching: boolean) => ({type: 'projects/SET_FETCHING', isFetching} as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const getProjects = (userIds: Array<number>): ThunkType => async (dispatch) => {
    try {
        let projectIds: Array<ProjectToUserIdsMatch> = await projectsAPI.getProjectIdsByUserIds(userIds)
        let projects: Array<ProjectType> = await projectsAPI.getProjectsByIds(projectIds.map((p) => p.projectId))
        dispatch(actions.setProjects(projects))
    }
    catch (e) {
        alert(e.message)
    }

}

export default projectsReducer