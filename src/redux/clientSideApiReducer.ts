import {ThunkAction} from "redux-thunk"
import {AuthDataType, ProjectsType, ProjectToUserIdsMatch, TasksType, UsersType} from "../api/apiTypes"
import {ActionsTypes, AppStateType} from "./store"

let initialState = {
    clientSideData: {
        users: {
            items: [] as UsersType, //new or changed items
            deleted: [] as Array<number> //ids of deleted items
        },
        authData: {
            items: [] as AuthDataType, //new or changed items
            deleted: [] as Array<number> //ids of deleted items
        },
        projectsToUsers: {
            items: [] as Array<ProjectToUserIdsMatch>, //new or changed items
            deleted: [] as Array<number> //ids of deleted items
        },
        projects: {
            items: [] as ProjectsType, //new or changed items
            deleted: [] as Array<number> //ids of deleted items
        },
        tasks: {
            items: [] as TasksType, //new or changed items
            deleted: [] as Array<number> //ids of deleted items
        }
    }
};

type InitialStateType = typeof initialState
type DataType = typeof initialState.clientSideData
type TableNamesTypes = keyof DataType
type ItemType = {id: number, [key: string]: any}

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
        default: return state
    }
};


type ActionsType = ActionsTypes<typeof actions>
export const actions = {
    addIdToDeleted: (tableName: TableNamesTypes, itemId:number) => ({type: 'ADD_ID_TO_DELETED', tableName, itemId} as const),
    addNewItem: (tableName: TableNamesTypes, item: ItemType) => ({type: 'ADD_NEW_ITEM', tableName, item} as const),
    deleteItem: (tableName: TableNamesTypes, itemId:number) => ({type: 'DELETE_ITEM', tableName, itemId} as const)
}


/*type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => async (dispatch) => {
    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(actions.setUsers(data.items));
};*/



export default clientSideApiReducer