export type AuthDataType = {
    id: number
    email: string
    password: string
}

export type ProjectToUserIdsMatch = {
    id: number
    projectId: number
    userId: number
}

export type UserType = {
    id: number
    nickname: string
}

export type ProjectType = {
    id: number
    projectName: string
}

export type TaskType = {
    id: number
    project: number
    author: number
    date: string
    title: string
    isDone?: boolean
}

export type TaskFilterType = {
    status: boolean | null
    content: string
}
