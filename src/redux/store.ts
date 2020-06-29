import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import clientSideApiReducer from "./clientSideApiReducer"
import authReducer from "./authReducer"
import projectsReducer from "./projectsReducer"
import usersReducer from "./usersReducer"
import tasksReducer from "./tasksReducer"
import appReducer from "./appReducer"

let rootReducer = combineReducers({
    api: clientSideApiReducer,
    auth: authReducer,
    projects: projectsReducer,
    users: usersReducer,
    tasks: tasksReducer,
    app: appReducer,
    clientSideDb: clientSideApiReducer
});

// Выведение типа глобального redux state
export type AppStateType = ReturnType<typeof rootReducer>

// Выведение типа для объектов action
export type InferActionsType<T> = T extends { [key: string]: (...args: any[]) => infer R} ? R : never

// Подключение React DevTools
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Создание Redux store
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store