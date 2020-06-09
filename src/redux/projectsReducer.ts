import {ThunkAction} from "redux-thunk"
import {ActionsTypes, AppStateType} from "./store"
import {authAPI, projectsAPI, usersAPI} from "../api/api"
import {ProjectsType, ProjectToUserIdsMatch, UsersType} from "../types/types"

let initialState = {
    projects: [] as ProjectsType
};

type InitialStateType = typeof initialState


const projectsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET_PROJECTS":
            return {
                ...state,
                projects: action.projects
            }
        default: return state
    }
};

type ActionsType = ActionsTypes<typeof actions>
export const actions = {
    setProjects: (projects: ProjectsType) => ({type: 'SET_PROJECTS', projects} as const),
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const getProjects = (userId: number): ThunkType => async (dispatch) => {
    try {
        let projectIds = await projectsAPI.getProjectIdsByUserIds([userId])
        let projects: ProjectsType = await projectsAPI.getProjectsByIds(projectIds.map((p) => p.projectId))
        dispatch(actions.setProjects(projects))
    }
    catch (e) {
        alert(e.message)
    }

}

export default projectsReducer