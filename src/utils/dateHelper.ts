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