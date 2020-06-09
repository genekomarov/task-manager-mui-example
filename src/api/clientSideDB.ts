/**
 * Модуль для работы с fake api JSONPlaceholder
 * При удалении или изменении данных с помощью fake api
 * сервер имитирует ответ, однако данные физически не изменяются
 * и при следующих запросах приходят в устаревшем виде
 *
 * clientSideDB хранит новые данные на стороне клиента и объединят их
 * с данными, приходящими с сервера.
 * При дублировании данных приоритет отдается данным на стороне клиента
 * */
type ItemType = {id: number, [key: string]: any}
type InitialDataType = {[key: string]: {items: Array<ItemType>, deleted: Array<number>}}
type TableNamesTypes = keyof InitialDataType


type ClientSideDbType = {
    _data: InitialDataType | null
    setInitialData (data: InitialDataType): void
    addIdToDeleted (tableName: TableNamesTypes, itemId: number): void
    itemIsDeleted (tableName: TableNamesTypes, itemId: number): boolean
    addNewItem (tableName: TableNamesTypes, item: ItemType): void
    /*itemIsExist (tableName: TableNamesTypes, item: ItemType): boolean*/
}

const clientSideDB: ClientSideDbType = {
    _data: null,

    setInitialData (data) {
        this._data = data
    },

    addIdToDeleted (tableName, itemId) {
        Array.isArray( this._data) && this._data[tableName].deleted.push(itemId)
    },

    itemIsDeleted (tableName, itemId) {
        if (Array.isArray( this._data))
            return !!this._data[tableName].deleted.findIndex((_item: number) => _item === itemId)
        else return false
    },

    addNewItem (tableName, item) {
        Array.isArray( this._data) && this._data[tableName].items.push(item)
    },

    /*itemIsExist (tableName, item) {
        if (Array.isArray( this._data))
            return !!this._data[tableName].items.findIndex((_item: ItemType) => _item.id === item.id)
        else return false
    }*/
}

export default clientSideDB