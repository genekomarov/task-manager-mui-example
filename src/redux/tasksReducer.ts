import {ThunkAction} from "redux-thunk"
import {InferActionsType, AppStateType} from "./store"
import {tasksAPI} from "../api/api"
import {TaskFilterType, TaskSortType, TaskType} from "../types/types"
import {addIdToDeleted, addNewItem, deleteItem} from "./clientSideApiReducer"
import {newError, ROUTE} from "./appReducer"
import {sortByDate, sortByStatus} from "../utils/tasksFilters"
import {setSelectedProjectId} from "./projectsReducer"

type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

let initialState = {
    tasks: [] as Array<TaskType>,
    filteredTasks: [] as Array<TaskType>,
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
    idCounter: 1000,
    addNewTaskInProcess: false
};

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
                tasks: [
                    ...state.tasks,
                    {
                        id: action.task.id,
                        project: action.task.project,
                        author: action.task.author,
                        date: action.task.date,
                        title: action.task.title,
                        isDone: action.task.isDone
                    }
                ],
                idCounter: state.idCounter + 1
            }
        case "tasks/SET_ADDING_NEW_TASK_IN_PROGRESS":
            return {
                ...state,
                addNewTaskInProcess: action.inProgress
            }
        case "tasks/SET_FILTERED_TASKS":
            return {
                ...state,
                filteredTasks: action.tasks
            }
        default:
            return state
    }
}

export const actions = {
    setTasks: (tasks: Array<TaskType>) => ({type: 'tasks/SET_TASKS', tasks} as const),
    setFetching: (isFetching: boolean) => ({type: 'tasks/SET_FETCHING', isFetching} as const),
    setFilter: (filter: TaskFilterType) => ({type: 'tasks/SET_FILTER', filter} as const),
    setSort: (sort: TaskSortType) => ({type: 'tasks/SET_SORT', sort} as const),
    setCountOfShownTasks: (countOfShownTasks: number) => ({type: 'tasks/SET_COUNT_OF_SHOWN_TASKS', countOfShownTasks} as const),
    changeTask: (taskId: number, status: boolean, title: string) => ({type: 'tasks/CHANGE_TASK', taskId, status, title} as const),
    deleteTask: (taskId: number) => ({type: 'tasks/DELETE_TASK', taskId} as const),
    newTask: (task: TaskType) => ({type: 'tasks/NEW_TASK', task} as const),
    setAddingNewTaskInProgress: (inProgress: boolean) => ({type: 'tasks/SET_ADDING_NEW_TASK_IN_PROGRESS', inProgress} as const),
    setFilteredTasks: (tasks: Array<TaskType>) => ({type: 'tasks/SET_FILTERED_TASKS', tasks} as const)
}

/**
 * Получение задач для указанного списка ID проектов или пользователей
 * @param {Array<number> | null} projectIds
 * @param {Array<number> | null} userIds
 * @return {Promise<void>}
 * */
export const getTasks = (projectIds: Array<number> | null, userIds: Array<number> | null): ThunkType => async (dispatch, getState) => {

    const state = getState()
    const tasksOnClient = state.clientSideDb.clientSideData.tasks
    const selectedProjectId = state.projects.selectedProjectId
    const route = state.app.route

    try {
        let tasks = await tasksAPI.getTasksByProjectOrUserIds(projectIds, userIds)

        // Объединение данных, полученных с сервера, с данными на стороне клиента
        let tasksWithClientSideData = tasks.filter(
            t => !tasksOnClient.deleted.filter(
                item => item === t.id
            ).length
        ).concat(
            route === ROUTE.ROOT
                ? tasksOnClient.items.filter(item => item.project === selectedProjectId)
                : tasksOnClient.items
        )

        dispatch(actions.setTasks(tasksWithClientSideData))
        dispatch(actions.setFilter({userIds: null, status: null, content: ""}))
        dispatch(actions.setSort({firstNew: null, firstCompleted: null}))
        await dispatch(filterTasks())
        dispatch(actions.setFetching(false))
    } catch (e) {
        dispatch(newError(e.message + ' Ошибка загрузки задач'))
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
 * Установка фильтра
 * @param {TaskFilterType} filter
 * @param {boolean} rewrite - Флаг предварительного сброса текущего значения перед установкой нового
 * @return {Promise<void>}
 * */
export const setFilter = (filter: TaskFilterType, rewrite = false): ThunkType => async (dispatch) => {
    if (rewrite) dispatch(actions.setFilter({
        userIds: filter.userIds !== undefined ? null : undefined,
        status: filter.status !== undefined ? null : undefined,
        content: filter.content !== undefined ? null : undefined,
    }))
    dispatch(actions.setFilter(filter))
    dispatch(filterTasks())
}

/**
 * Установка сортировки
 * @param {TaskSortType} sort
 * @return {Promise<void>}
 * */
export const setSort = (sort: TaskSortType): ThunkType => async (dispatch) => {
    dispatch(actions.setSort(sort))
    dispatch(filterTasks())
}

/**
 * Установка списка задач
 * @param {Array<TaskType>} tasks
 * @return {Promise<void>}
 * */
export const setTasks = (tasks: Array<TaskType>): ThunkType => async (dispatch) => {
    dispatch(actions.setTasks(tasks))
    await dispatch(filterTasks())
    dispatch(actions.setFetching(false))
}

/**
 * Удаление задачи
 * @param {number} taskId
 * @return {Promise<void>}
 * */
export const deleteTask = (taskId: number): ThunkType => async (dispatch) => {
    try {
        // Эта строка закомментрированая, так как используется fake api
        // Попытка удаления задачи, не существующей на сервере, приводит к выбросу исключения
        /*let response = await tasksAPI.deleteTask(taskId)*/
        dispatch(actions.deleteTask(taskId))
        await dispatch(addIdToDeleted('tasks', taskId))
        await dispatch(deleteItem('tasks', taskId))
        dispatch(filterTasks())
    } catch (e) {
        dispatch(newError(e.message + ' Ошибка удаления задачи'))
    }
}

/**
 * Изменение задачи
 * @param {TaskType} task
 * @return {Promise<void>}
 * */
export const changeTask = (task: TaskType): ThunkType => async (dispatch) => {
    try {
        // Эта строка закомментрированая, так как используется fake api
        // Попытка изменения задачи, не существующей на сервере, приводит к выбросу исключения
        /*let response = await tasksAPI.changeTask(task.id, task.title, task.isDone)*/
        dispatch(actions.changeTask(task.id, task.isDone, task.title))
        await dispatch(addIdToDeleted('tasks', task.id))
        await dispatch(deleteItem('tasks', task.id))
        await dispatch(addNewItem('tasks', task))
        await dispatch(filterTasks())
    } catch (e) {
        dispatch(newError(e.message + ' Ошибка изменения задачи'))
    }
}

/**
 * Добавление задачи
 * @param {TaskType} task
 * @return {Promise<void>}
 * */
export const newTask = (task: TaskType): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.setAddingNewTaskInProgress(true))
        await tasksAPI.addNewTask(task)
        dispatch(actions.newTask(task))
        await dispatch(addNewItem('tasks', task))
        await dispatch(filterTasks())
    } catch (e) {
        dispatch(newError(e.message + ' Ошибка добавления задачи'))
    } finally {
        dispatch(actions.setAddingNewTaskInProgress(false))
    }
}

/**
 * Объединение данных сервера с данными клиента, фильтрация и сортировка
 * @return {Promise<void>}
 * */
export const filterTasks = (): ThunkType => async (dispatch, getState) => {
    const state = getState()
    const tasks = state.tasks.tasks
    const filter = state.tasks.filter
    const sort = state.tasks.sort

    // Фильтрация задач
    let filteredTasks = tasks.filter((t) => {
        let statusFilter = filter.status !== null ? t.isDone === filter.status : true
        let usersFilter = filter.userIds && filter.userIds.length > 0 ? filter.userIds.filter(id => id === t.author).length > 0 : true
        let contentFilter = filter.content ? t.title.match(new RegExp(filter.content, 'gi')) : true
        return statusFilter && usersFilter && contentFilter
    })

    // Сортировка задач
    filteredTasks = filteredTasks.sort((a: TaskType, b: TaskType): number => {
        let sortResultByStatus = sortByStatus(a, b, sort.firstCompleted)
        let sortResultByDate = sortByDate(a, b, sort.firstNew)

        if (sortResultByStatus !== 0) return sortResultByStatus
        else return sortResultByDate
    })

    dispatch(actions.setCountOfShownTasks(filteredTasks.length))
    dispatch(actions.setFilteredTasks(filteredTasks))
}

/**
 * Получение всех задачь для авторизованного пользователя
 * @return {Promise<void>}
 * */
export const selectMyTasks = (): ThunkType => async (dispatch, getState) => {
    let myId = getState().auth.id
    dispatch(actions.setFetching(true))
    dispatch(setSelectedProjectId(null))
    if (myId !== null) await dispatch(getTasks([], [myId]))
    dispatch(actions.setFetching(false))
}

export default tasksReducer