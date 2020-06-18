import {ThunkAction} from "redux-thunk"
import {ActionsTypes, AppStateType} from "./store"
import {authAPI, projectsAPI, tasksAPI, usersAPI} from "../api/api"
import {ProjectToUserIdsMatch, ProjectType, TaskFilterType, TaskSortType, TaskType, UserType} from "../types/types"
import {addIdToDeleted, addNewItem, deleteItem} from "./clientSideApiReducer"

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
    countOfShownTasks: 0,
    idCounter: 1000
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
        case "tasks/DELETE_TASK":
            return {
                ...state,
                tasks: [...state.tasks.filter(t => t.id !== action.taskId)]
            }
        case "tasks/CHANGE_TASK": {
            let changeTaskId = state.tasks.findIndex(t => t.id === action.taskId)
            return changeTaskId === -1
                ? state
                : {
                ...state,
                tasks: [
                    ...state.tasks.filter(t => t.id !== action.taskId),

                    {
                        ...state.tasks[changeTaskId],
                        isDone: action.status,
                        title: action.title
                    }
                ],
            }

        }
        case "tasks/NEW_TASK":
            return {
                ...state,
                /*tasks: [
                    ...state.tasks,
                    {
                        id: action.task.id,
                        project: action.task.project,
                        author: action.task.author,
                        date: action.task.date,
                        title: action.task.title,
                        isDone: action.task.isDone
                    }
                ],*/
                idCounter: state.idCounter + 1
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
    } as const),
    changeTask: (taskId: number, status: boolean, title: string) => ({
        type: 'tasks/CHANGE_TASK',
        taskId,
        status,
        title
    } as const),
    deleteTask: (taskId: number) => ({type: 'tasks/DELETE_TASK', taskId} as const),
    newTask: (task: TaskType) => ({
        type: 'tasks/NEW_TASK', task
    } as const),
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

export const deleteTask = (taskId: number): ThunkType => async (dispatch) => {
    try {
        /*let response = await tasksAPI.deleteTask(taskId)*/
        dispatch(actions.deleteTask(taskId))
        await dispatch(addIdToDeleted('tasks', taskId))
        await dispatch(deleteItem('tasks', taskId))
    } catch (e) {
        alert(e.message)
    }
}

export const changeTask = (task: TaskType): ThunkType => async (dispatch) => {
    try {
        /*let response = await tasksAPI.changeTask(task.id, task.title, task.isDone)*/
        dispatch(actions.changeTask(task.id, task.isDone, task.title))
        await dispatch(addIdToDeleted('tasks', task.id))
        await dispatch(deleteItem('tasks', task.id))
        await dispatch(addNewItem('tasks', task))
    } catch (e) {
        alert(e.message)
    }
}

export const newTask = (task: TaskType): ThunkType => async (dispatch) => {
    try {
        /*let response = await tasksAPI.addNewTask(task)*/
        dispatch(actions.newTask(task))
        await dispatch(addNewItem('tasks', task))
    } catch (e) {
        alert(e.message)
    }
}

export default tasksReducer