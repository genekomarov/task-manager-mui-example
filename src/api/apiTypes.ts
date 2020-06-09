export type AuthDataType = Array<{
    id: number
    email: string
    password: string
}>
export type ProjectToUserIdsMatch = {
    id: number
    projectId: number
    userId: number
}
export type UsersType = Array<{
    id: number
    nickname: string
}>
export type ProjectsType = Array<{
    id: number
    projectName: string
}>
export type TaskType = {
    id: number
    project: number
    author: number
    date: string
    title: string
    isDone?: boolean
}
export type TasksType = Array<TaskType>