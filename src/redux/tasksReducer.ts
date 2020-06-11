import {ThunkAction} from "redux-thunk"
import {ActionsTypes, AppStateType} from "./store"
import {authAPI, projectsAPI, tasksAPI, usersAPI} from "../api/api"
import {ProjectToUserIdsMatch, ProjectType, TaskFilterType, TaskType, UserType} from "../types/types"

let initialState = {
    tasks: [] as Array<TaskType>
};

type InitialStateType = typeof initialState


const tasksReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET_TASKS":
            return {
                ...state,
                tasks: action.tasks
            }
        default: return state
    }
};

type ActionsType = ActionsTypes<typeof actions>
export const actions = {
    setTasks: (tasks: Array<TaskType>) => ({type: 'SET_TASKS', tasks} as const),
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const getTasks = (
    projectIds: Array<number> | null,
    userIds: Array<number> | null,
    filter?: TaskFilterType
): ThunkType => async (dispatch) => {
    try {
        let tasks = await tasksAPI.getTasksByProjectOrUserIds(projectIds, userIds)
        if (filter) {
            if (filter.status !== null) {
                tasks = tasks.filter( t =>
                    t.isDone === filter.status
                )
            }
            if (filter.content !=='') {
                tasks = tasks.filter( t =>
                    !!t.title.match(new RegExp(filter.content, 'g'))
                )
            }
        }
        dispatch(actions.setTasks(tasks))
    }
    catch (e) {
        alert(e.message)
    }

}

export default tasksReducer