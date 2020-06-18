import {TaskType} from "../types/types"

export const filterByStatus = (a: TaskType, b: TaskType, firstCompleted: boolean | null | undefined) => {
    if (firstCompleted !== null) {
        if (firstCompleted === true) {
            if (a.isDone === b.isDone) return 0
            else if (a.isDone > b.isDone) return -1
            else return 1
        }
        else {
            if (a.isDone === b.isDone) return 0
            else if (a.isDone < b.isDone) return -1
            else return 1
        }
    } else return 0
}

export const filterByDate = (a: TaskType, b: TaskType, firstNew: boolean | null | undefined) => {
    const dateDiff = a.date - b.date
    if (firstNew === true || null) return dateDiff * -1
    else return dateDiff
}