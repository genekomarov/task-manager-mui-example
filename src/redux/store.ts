import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import clientSideApiReducer from "./clientSideApiReducer"
import authReducer from "./authReducer"
import projectsReducer from "./projectsReducer"
import usersReducer from "./usersReducer"
import tasksReducer from "./tasksReducer"

let rootReducer = combineReducers({
    api: clientSideApiReducer,
    auth: authReducer,
    projects: projectsReducer,
    users: usersReducer,
    tasks: tasksReducer
});

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

type UnionTypeFromObj<T> = T extends {[key: string]: infer R} ? R : never
export type ActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<UnionTypeFromObj<T>>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

/*let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));*/

export default store