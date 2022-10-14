export interface ClientFromForm extends Client {
    csrf_token: string,
}

export interface Client {
    id?: number | string,
    name: string,
    surname: string,
    passport: string,
    password: string,
    email: string
}