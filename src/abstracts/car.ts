export interface CarFromForm {
    csrf_token: string,
    id?: string,
    mileage: string,
    number: string,
    brand: string,
    model: string,
    country: string,
    client_name: string,
    client_surname: string,
    year: string
}

export interface Car {
    id: number,
    mileage: number,
    number: string,
    brandName: string,
    model: string,
    countryName: string,
    clientName: string,
    clientSurname: string,
    yearManifacture: number
}

export interface DbCar {
    id: number,
    mileage: number,
    number: string,
    brand_name: string,
    model: string,
    country_name: string,
    client_name: string,
    client_surname: string,
    year_manifacture: number
}