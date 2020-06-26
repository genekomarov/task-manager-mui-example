/**
 * Преобразует переданный массив параметров в сегмент строки для использования в GET-запросах.
 * @param {string} argName - Имя параметра.
 * @param {Array<number | string> | null} argArray - Массив значений параметра. Если передан null, возвращается пустая строка.
 * @return {string} Строка из пар имя_параметра=значение_параметра.
 */
export const arrayToStringArguments = (argName: string, argArray: Array<number | string> | null) =>
    argArray
        ? argArray.map((arg) => `${argName}=${arg}&`).toString().replace(/,/g,'')
        : ""