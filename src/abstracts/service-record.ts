export interface ServiceRecord {
    id?: number | string,
    date: Date | string,
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