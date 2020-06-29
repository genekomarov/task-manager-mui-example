/**
 * Преобразует переданный объект даты в строку формата "dd.mm.yyyy hh:mm".
 * @param {Date} date - Объект даты.
 * @return {string} Дата в формате строки.
 */
export const getDateString = (date: Date) =>
    `${
        date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    }.${
        date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }.${
        date.getFullYear()
    } ${
        date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    }:${
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    }`