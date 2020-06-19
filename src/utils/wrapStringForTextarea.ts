import React from "react"

/**
 * Переновит строку в зависимости от положения коретки у объекта события onKeyDown для текстровых полей
 *
 * @param {React.KeyboardEvent<HTMLInputElement>} e - Объект события onKeyDown
 * @return {React.KeyboardEvent<HTMLInputElement>} Объект события с измененным значением поля
 * */
const getEventWithWrappedString = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value
    let start = e.currentTarget.selectionStart
    let end = e.currentTarget.selectionEnd

    //Формируем строку с переносами
    e.currentTarget.value =
        value.slice(0, start !== null ? start : undefined) + '\n' +
        value.slice(end !== null ? end : undefined, value.length-1)

    //Устанавливам положение коретки
    e.currentTarget.selectionStart = start ? start + 1 : value.length - 1
    e.currentTarget.selectionEnd = start ? start + 1 : value.length - 1

    return e
}

/**
 * Обработчик события onKeyDown для многострочных текстовых полей
 * Изменяет способ отправки формы на Ctrl+Enter для UserAgent = /Windows/
 *
 * @param {() => void} handleSubmit - обработчик события отправки формы
 * @param {(e: React.KeyboardEvent<HTMLInputElement>) => void} handleChange - обработчик события изменения значения поля формы
 * @param {string} userAgent - значение параметра navigator.userAgent
 * */
export const hendleKeyDownOnTextarea = (
    handleSubmit: () => void,
    handleChange: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    userAgent: string
) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.ctrlKey) {
        if (/Windows NT/.test(userAgent)) {
            handleSubmit()
            e.preventDefault()
        }
    } else if (e.key === 'Enter' && e.ctrlKey) {
        handleChange(getEventWithWrappedString(e))
    }
}