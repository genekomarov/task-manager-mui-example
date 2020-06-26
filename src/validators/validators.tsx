/**
 * Валидация строки - Email.
 * @param {string} value - Email адрес.
 * @return {string} Сообщение об ошибке валидации. Пустая строка если валидация пройдена.
 * */
export const isEmail = (value: string): string =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Неправильный формат адреса' : ''