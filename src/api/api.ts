import axios from 'axios'
import {AuthDataType, ProjectToUserIdsMatchType, ProjectType, TaskType, UserType} from "../types/types"
import {arrayToStringArguments} from "../utils/arrayToStringArguments"

/**
 * Преднастроенный экземпляр axios.
 * */
const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://my-json-server.typicode.com/genekomarov/task-manager_mui',
    headers: {}
})

/**
 * Авторизация.
 * */
export const authAPI = {
    auth: (email: string, password: string) => {
        return instance.get<Array<AuthDataType>>(`/authData?email=${email}&password=${password}`)
            .then(response => response.data)
    }
}

/**
 * Работа с пользователями.
 * */
export const usersAPI = {

    /**
     * Получение набора пользователей по их ID.
     * @param {Array<number>} setOfUserIds - Набор ID пользователей.
     * @return {Promise<Array<UserType>> | []} Набор пользователей.
     * */
    getUsersByIds: (setOfUserIds: Array<number>) =>
        setOfUserIds.length
            ? instance.get<Array<UserType>>(`/users?${arrayToStringArguments("id", setOfUserIds)}`)
                .then(response => response.data)
            : [],

    /**
     * Получение набора соответствий записей из таблиц "projects" и "users" по набору ID проектов.
     * @param {Array<number>} setOfProjectIds - Набор ID проектов.
     * @return {Promise<Array<ProjectToUserIdsMatchType>> | []} - Набор соответствий.
     * */
    getUserIdsByProjectIds: (setOfProjectIds: Array<number>) =>
        setOfProjectIds.length
            ? instance.get<Array<ProjectToUserIdsMatchType>>(
                `/projects-to-users?${arrayToStringArguments("projectId", setOfProjectIds)}`)
                .then(response => response.data)
            : [],

    /**
     * Добавление пользователя.
     * Метод не реализован.
     * */
    addNewUser: () => console.error("method 'addNewUser' is not implemented"),

    /**
     * Изменение пользователя.
     * Метод не реализован.
     * */
    changeUser: () => console.error("method 'changeUser' is not implemented"),

    /**
     * Удаление пользователя.
     * Метод не реализован.
     * */
    deleteUser: () => console.error("method 'deleteUser' is not implemented")
}

/**
 * Работа с проектами.
 * */
export const projectsAPI = {

    /**
     * Получение набора проектов по их ID.
     * @param {Array<number>} setOfProjectIds - Набор ID проектов.
     * @return {Promise<Array<ProjectType>> | []} Набор проектов.
     * */
    getProjectsByIds: (setOfProjectIds: Array<number>) =>
        setOfProjectIds.length
            ? instance.get<Array<ProjectType>>(`/projects?${arrayToStringArguments("id", setOfProjectIds)}`)
                .then(response => response.data)
            : [],

    /**
     * Получение набора соответствий записей таблиц "projects" и "users" по набору ID пользователей.
     * @param {Array<number>} setOfUserIds - Набор ID пользователей.
     * @return {Promise<Array<ProjectToUserIdsMatchType>> | []} - Набор соответствий.
     * */
    getProjectIdsByUserIds: (setOfUserIds: Array<number>) =>
        setOfUserIds.length
            ? instance.get<Array<ProjectToUserIdsMatchType>>(
                `/projects-to-users?${arrayToStringArguments("userId", setOfUserIds)}`)
                .then(response => response.data)
            : [],

    /**
     * Добавление проекта.
     * Метод не реализован.
     * */
    addNewProject: () => console.error("method 'addNewProject' is not implemented"),

    /**
     * Изменение проекта.
     * Метод не реализован.
     * */
    changeProject: () => console.error("method 'changeProject' is not implemented"),

    /**
     * Удаление проекта.
     * Метод не реализован.
     * */
    deleteProject: () => console.error("method 'deleteProject' is not implemented")
}

/**
 * Работа с задачами.
 * */
export const tasksAPI = {

    /**
     * Получение набора задач по ID проектов и/или пользователей.
     * @param {Array<number> | null} setOfProjectIds - Набор ID проектов.
     * @param {Array<number> | null} setOfUserIds - Набор ID пользователей.
     * @return {Promise<Array<TaskType>> | []} Набор задач.
     * */
    getTasksByProjectOrUserIds: (setOfProjectIds: Array<number> | null, setOfUserIds: Array<number> | null) =>
        setOfProjectIds || setOfUserIds
            ? instance.get<Array<TaskType>>(
                `/tasks?${arrayToStringArguments("project", setOfProjectIds)}${arrayToStringArguments("author", setOfUserIds)}`)
                .then(response => response.data)
            : [],

    /**
     * Добавление задами.
     * @param {TaskType} task - Объект задачи.
     * @return {Promise<any>} Ответ сервера. Не имеет значения, так как пока не используется в проекте.
     * */
    addNewTask: (task: TaskType) =>
        instance.post<TaskType>(`/tasks`, task)
            .then(response => response.data),

    /**
     * Изменение задами.
     * @param {number} taskId - ID задачи.
     * @param {string} title - Заголовок задачи.
     * @param {boolean} isDone - Статус задачи.
     * @return {Promise<any>} Ответ сервера. Не имеет значения, так как пока не используется в проекте.
     * */
    changeTask: (taskId: number, title: string, isDone: boolean) =>
        instance.patch<TaskType>(`/tasks/${taskId}`, {title, isDone})
            .then(response => response.data),

    /**
     * Удаление задами.
     * @param {number} taskId - ID задачи.
     * @return {Promise<any>} Ответ сервера. Не имеет значения, так как пока не используется в проекте.
     * */
    deleteTask: (taskId: number) =>
        instance.delete<TaskType>(`/tasks/${taskId}`)
            .then(response => response.data),
}

