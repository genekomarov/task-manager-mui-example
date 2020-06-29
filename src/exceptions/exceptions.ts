/**
 * Исключение ошибки авторизации.
 * */
export class AuthorizationFailedException {
    message: string;
    constructor () {
        this.message = `Авторизация не удалась`
    }
}