export interface ClientFromForm {
    csrf_token: string,
    id?: string,
    email: string,
    password: string
    name: string,
    surname: string,
    passport: string,
}

export interface Client {
    id: number,
    name: string,
    surname: string,
    passport: string,
    password: string,
    email: string
}