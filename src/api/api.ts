import axios from 'axios'
import {
    AuthDataType,
    ProjectToUserIdsMatch,
    ProjectType,
    TaskType, UserType
} from "../types/types"
import arrayToStringArguments from "../utils/arrayToStringArguments"


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://my-json-server.typicode.com/genekomarov/task-manager_mui',
    headers: {}
})

export const authAPI = {
    auth: (email: string, password: string) => {
        return instance.get<Array<AuthDataType>>(`/authData?email=${email}&password=${password}`)
            .then(response => response.data)
    }
}



export const usersAPI = {
    getUsersByIds: (setOfUserIds: Array<number>) =>
        setOfUserIds.length
            ? instance.get<Array<UserType>>(`/users?${arrayToStringArguments("id", setOfUserIds)}`)
                .then(response => response.data)
            : [],

    getUserIdsByProjectIds: (setOfProjectIds: Array<number>) =>
        setOfProjectIds.length
            ? instance.get<Array<ProjectToUserIdsMatch>>(
                `/projects-to-users?${arrayToStringArguments("projectId", setOfProjectIds)}`)
                .then(response => response.data)
            : [],


    addNewUser: () => console.error("method 'addNewUser' is not implemented"),
    changeUser: () => console.error("method 'changeUser' is not implemented"),
    deleteUser: () => console.error("method 'deleteUser' is not implemented")
}

export const projectsAPI = {
    getProjectsByIds: (setOfProjectIds: Array<number>) =>
        setOfProjectIds.length
            ? instance.get<Array<ProjectType>>(`/projects?${arrayToStringArguments("id", setOfProjectIds)}`)
                .then(response => response.data)
            : [],

    getProjectIdsByUserIds: (setOfUserIds: Array<number>) =>
        setOfUserIds.length
            ? instance.get<Array<ProjectToUserIdsMatch>>(
                `/projects-to-users?${arrayToStringArguments("userId", setOfUserIds)}`)
                .then(response => response.data)
            : [],


    addNewProject: () => console.error("method 'addNewProject' is not implemented"),
    changeProject: () => console.error("method 'changeProject' is not implemented"),
    deleteProject: () => console.error("method 'deleteProject' is not implemented")
}

export const tasksAPI = {
    getTasksByProjectOrUserIds: (setOfProjectIds: Array<number> | null, setOfUserIds: Array<number> | null) =>
        setOfProjectIds || setOfUserIds
            ? instance.get<Array<TaskType>>(
                `/tasks?${arrayToStringArguments("project", setOfProjectIds)}${arrayToStringArguments("author", setOfUserIds)}`)
                .then(response => response.data)
            : [],

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

