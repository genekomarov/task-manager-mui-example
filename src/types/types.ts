/** Тип записи, возвращаемой при проверки наличия пары email-password в базе*/
export type AuthDataType = {
    id: number
    email: string
    password: string
}

/** Тип записи, вовращаемой при проверке соответствия записей из таблиц "projects" и "users" в базе */
export type ProjectToUserIdsMatchType = {
    id: number
    projectId: number
    userId: number
}

/** Тип записи из таблицы "users" в базе*/
export type UserType = {
    id: number
    nickname: string
}

/** Тип записи из таблицы "projects" в базе*/
export type ProjectType = {
    id: number
    projectName: string
}

/** Тип записи из таблицы "tasks" в базе*/
export type TaskType = {
    id: number
    project: number
    author: number
    date: number
    title: string
    isDone: boolean
}

/** Тип данных, принимаемых при настройке фильтра выводимых задач*/
export type TaskFilterType = {
    userIds: Array<number> | null | undefined
    status: boolean | null | undefined
    content: string | null | undefined
}

/** Тип данных, принимаемых при настройке сортировки выводимых задач*/
export type TaskSortType = {
    firstCompleted: boolean | null | undefined,
    firstNew: boolean | null | undefined
}