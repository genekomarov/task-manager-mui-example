import axios from 'axios'
import {AuthDataType, ProjectsType, ProjectToUserIdsMatch, TasksType, TaskType, UsersType} from "./apiTypes"
import arrayToStringArguments from "../utils/arrayToStringArguments"
import clientSideDB from "./clientSideDB"

let initialData = {
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

clientSideDB.setInitialData(initialData)



const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://my-json-server.typicode.com/genekomarov/task-manager_mui',
    headers: {}
})

export const authAPI = {
    authMe: (email: string, password: string) =>
        instance.get<AuthDataType>(`/authData?email=${email}&password=${password}`)
            .then(response => response.data)
}

export const usersAPI = {
    getUsersByIds: (setOfUserIds: Array<number>) =>
        instance.get<UsersType>(`/users?${arrayToStringArguments("id", setOfUserIds)}`)
            .then(response => response.data),

    getUserIdsByProjectIds: (setOfProjectIds: Array<number>) =>
        instance.get<ProjectToUserIdsMatch>(
            `/projects-to-users?${arrayToStringArguments("projectId", setOfProjectIds)}`
        ).then(response => response.data),

    addNewUser: () => console.error("method 'addNewUser' is not implemented"),
    changeUser: () => console.error("method 'changeUser' is not implemented"),
    deleteUser: () => console.error("method 'deleteUser' is not implemented")
}

export const projectsAPI = {
    getProjectsByIds: (setOfProjectIds: Array<number>) =>
        instance.get<ProjectsType>(`/projects?${arrayToStringArguments("id", setOfProjectIds)}`)
            .then(response => response.data),

    getProjectIdsByUserIds: (setOfUserIds: Array<number>) =>
        instance.get<ProjectToUserIdsMatch>(
            `/projects-to-users?${arrayToStringArguments("userId", setOfUserIds)}`
        ).then(response => response.data),

    addNewProject: () => console.error("method 'addNewProject' is not implemented"),
    changeProject: () => console.error("method 'changeProject' is not implemented"),
    deleteProject: () => console.error("method 'deleteProject' is not implemented")
}

export const tasksAPI = {
    getTasksByProjectOrUserIds: (setOfProjectIds: Array<number> | null, setOfUserIds: Array<number> | null) =>
        instance.get<TasksType>(
            `/tasks?${arrayToStringArguments("project", setOfProjectIds)}${arrayToStringArguments("user", setOfUserIds)}`
        ).then(response => response.data),

    addNewTask: (task: TaskType) =>
        instance.post<TaskType>(`/tasks`, task)
            .then(response => response.data),

    changeTask: (taskId: number, title: string, isDone: boolean) =>
        instance.patch<TaskType>(`/tasks/${taskId}`, {title, isDone})
            .then(response => response.data),

    deleteTask: (taskId: number) =>
        instance.delete<TaskType>(`/tasks/${taskId}`)
            .then(response => response.data),
}

