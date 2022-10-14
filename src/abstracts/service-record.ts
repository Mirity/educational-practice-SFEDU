export interface ServiceRecordFromForm {
    csrf_token: string,
    car: string,
    client: string,
    date: string
}

export interface ServiceRecord {
    id: number,
    date: Date,
    number: string,
    passport: string,
    clientName: string,
    clientSurname: string
}

export interface DbServiceRecord {
    id: number,
    date: Date,
    number: string,
    passport: string,
    client_name: string,
    client_surname: string

}