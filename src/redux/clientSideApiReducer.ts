import {ThunkAction} from "redux-thunk"
import {ProjectToUserIdsMatchType, ProjectType, TaskType, UserType} from "../types/types"
import {ActionsTypes, AppStateType} from "./store"

type InitialStateType = typeof initialState
type ActionsType = ActionsTypes<typeof actions>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

/** Объединенный тип из литералов имен подобъектов initialState.clientSideData*/
type TableNamesTypes = keyof typeof initialState.clientSideData
/** Универсальный тип для объектов items*/
type ItemType = { id: number, [key: string]: any }

let initialState = {
    clientSideData: {
        users: {
            items: [] as Array<UserType>, //new or changed items
            deleted: [] as Array<number> //ids of deleted items
        },
        authData: {
            items: [] as Array<UserType>, //new or changed items
            deleted: [] as Array<number> //ids of deleted items
        },
        projectsToUsers: {
            items: [] as Array<ProjectToUserIdsMatchType>, //new or changed items
            deleted: [] as Array<number> //ids of deleted items
        },
        projects: {
            items: [] as Array<ProjectType>, //new or changed items
            deleted: [] as Array<number> //ids of deleted items
        },
        tasks: {
            items: [] as Array<TaskType>, //new or changed items
            deleted: [] as Array<number> //ids of deleted items
        }
    }
};

const clientSideApiReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "ADD_ID_TO_DELETED":
            return {
                ...state,
                clientSideData: {
                    ...state.clientSideData,
                    [action.tableName]: {
                        ...state.clientSideData[action.tableName],
                        deleted: [
                            ...state.clientSideData[action.tableName].deleted,
                            action.itemId
                        ]
                    }
                }
            }
        case "ADD_NEW_ITEM":
            return {
                ...state,
                clientSideData: {
                    ...state.clientSideData,
                    [action.tableName]: {
                        ...state.clientSideData[action.tableName],
                        items: [
                            ...state.clientSideData[action.tableName].items,
                            action.item
                        ]
                    }
                }
            }
        case "DELETE_ITEM":
            return {
                ...state,
                clientSideData: {
                    ...state.clientSideData,
                    [action.tableName]: {
                        ...state.clientSideData[action.tableName],
                        items: [...state.clientSideData[action.tableName].items].filter(
                            (item: ItemType) => item.id !== action.itemId
                        )
                    }
                }
            }
        default:
            return state
    }
};

export const actions = {
    addIdToDeleted: (tableName: TableNamesTypes, itemId: number) => ({type: 'ADD_ID_TO_DELETED', tableName, itemId} as const),
    addNewItem: (tableName: TableNamesTypes, item: ItemType) => ({type: 'ADD_NEW_ITEM', tableName, item} as const),
    deleteItem: (tableName: TableNamesTypes, itemId: number) => ({type: 'DELETE_ITEM', tableName, itemId} as const)
}

/**
 * Добавление ID удаленного элемента для указанной таблицы
 * @param {TableNamesTypes} tableName
 * @param {number} itemId
 * @return {Promise<void>}
 * */
export const addIdToDeleted = (tableName: TableNamesTypes, itemId: number): ThunkType => async (dispatch) => {
    dispatch(actions.addIdToDeleted(tableName, itemId));
};

/**
 * Добавление элементы в указанную таблицу
 * @param {TableNamesTypes} tableName
 * @param {ItemType} item
 * @return {Promise<void>}
 * */
export const addNewItem = (tableName: TableNamesTypes, item: ItemType): ThunkType => async (dispatch) => {
    dispatch(actions.addNewItem(tableName, item));
};

/**
 * Удаление элемента из указанной таблицы
 * @param {TableNamesTypes} tableName
 * @param {number} itemId
 * @return {Promise<void>}
 * */
export const deleteItem = (tableName: TableNamesTypes, itemId: number): ThunkType => async (dispatch) => {
    dispatch(actions.deleteItem(tableName, itemId));
};

export default clientSideApiReducer