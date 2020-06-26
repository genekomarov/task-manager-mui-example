import {TaskType} from "../types/types"

/**
 * Функция для сравнения задач по параметру завершенности задачи.
 * Испльзуется в Callback для метода Array.prototype.sort() у списка задач
 *
 * @param {TaskType} a - Сравниваемый элемент
 * @param {TaskType} b - Сравниваемый элемент
 * @param {boolean | null | undefined} firstCompleted - Параметр сортировки
 * @return {number}
 * */
export const sortByStatus = (a: TaskType, b: TaskType, firstCompleted: boolean | null | undefined) => {
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

/**
 * Функция для сравнения задач по дате
 * Испльзуется в Callback для метода Array.prototype.sort() у списка задач
 *
 * @param {TaskType} a - Сравниваемый элемент
 * @param {TaskType} b - Сравниваемый элемент
 * @param {boolean | null | undefined} firstNew - Параметр сортировки
 * @return {number}
 * */
export const sortByDate = (a: TaskType, b: TaskType, firstNew: boolean | null | undefined) => {
    const dateDiff = a.date - b.date
    if (firstNew === true || null) return dateDiff * -1
    else return dateDiff
}