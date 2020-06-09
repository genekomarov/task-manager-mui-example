/**
 * Счетчик сдалан для работы с fake api.
 * Используется в качестве уникального идентификатора
 * при добавлении записи в любую из таблиц.
 * При вызове увеличивается на 1
 *
 * @param {number} counter - может быть использовано для сброса счетчика в любое значение. необязательный параметр
 * @return {number} newCounter - текущее значение счетчика.
 * */
let _universalCounter = 1000
export const getCounter = (counter: number = _universalCounter ): number => {
    if (counter !== _universalCounter) _universalCounter = counter
    return _universalCounter++
}