import axios from 'axios'

const arrayToStringArguments = (argName: string, argArray: Array<number | string>) =>
    argArray.map((arg) => `${argName}=${arg}&`).toString().replace(/,/g,'')

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://my-json-server.typicode.com/genekomarov/task-manager_mui',
    headers: {}
})

type AuthDataType = Array<{
    id: number
    email: string
    password: string
}>
export const authAPI = {
    authMe: (email: string, password: string) =>
        instance.get<AuthDataType>(`/authData?email=${email}&password=${password}`)
            .then(response => response.data)
}

type ProjectToUserIdsMatch = {
    id: number
    projectId: number
    userId: number
}
type UsersType = Array<{
    id: number
    nickname: string
    projects: Array<number>
}>
export const usersAPI = {
    getUsersByIds: (setOfUserIds: Array<number>) =>
        /*instance.get<UsersType>(`/users?${setOfUserIds.map((id) => `id=${id}&`).toString().replace(/,/g,'')}`)*/
        instance.get<UsersType>(`/users?${arrayToStringArguments("id", setOfUserIds)}`)
            .then(response => response.data),

    getUserIdsByProjectIds: (setOfProjectIds: Array<number>) =>
        instance.get<ProjectToUserIdsMatch>(
            `/projects-to-users?${arrayToStringArguments("projectId", setOfProjectIds)}`
        ).then(response => response.data)
}

type ProjectsType = Array<{
    id: number
    projectName: string
}>
export const projectsAPI = {
    getProjectsByIds: (setOfProjectIds: Array<number>) =>
        instance.get<ProjectsType>(`/users?${arrayToStringArguments("id", setOfProjectIds)}`)
            .then(response => response.data),

    getProjectIdsByUserIds: (setOfUserIds: Array<number>) =>
        instance.get<ProjectToUserIdsMatch>(
            `/projects-to-users?${arrayToStringArguments("userId", setOfUserIds)}`
        ).then(response => response.data)
}

type TasksType = Array<{
    id: number
    project: number
    author: number
    date: string
    title: string
    isDone: boolean
}>
export const tasksAPI = {
    getTasksByProjectOrUserIds: (setOfProjectIds: Array<number>, setOfUserIds: Array<number>) =>
        instance.get<TasksType>(`/tasks?
            ${arrayToStringArguments("project", setOfProjectIds)}
            ${arrayToStringArguments("user", setOfUserIds)}`
        ).then(response => response.data),
}
