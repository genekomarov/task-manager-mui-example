import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import clientSideApiReducer from "./clientSideApiReducer"
import authReducer from "./authReducer"
import projectsReducer from "./projectsReducer"
import usersReducer from "./usersReducer"
import tasksReducer from "./tasksReducer"
import appReducer from "./appReducer"

/**
 * Создание корневого редьюсера
 * */
let rootReducer = combineReducers({
    api: clientSideApiReducer,
    auth: authReducer,
    projects: projectsReducer,
    users: usersReducer,
    tasks: tasksReducer,
    app: appReducer,
    clientSideDb: clientSideApiReducer
});

// Получение типа общего Redux state
type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

/**
 * Generic
 * Выведение типа объекта с подобъектами
 * */
type UnionTypeFromObj<T> = T extends {[key: string]: infer R} ? R : never
/**
 * Generic
 * Выведение типа объекта с подобъектами в виде возвращаемых значений для подобъектов функций
 * */
export type ActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<UnionTypeFromObj<T>>

// Подключение React DevTools
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Создание Redux store
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store