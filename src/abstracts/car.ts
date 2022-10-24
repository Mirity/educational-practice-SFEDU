export interface Car {
    id?: number | string,
    mileage: number | string,
    number: string,
    brandName: string,
    model: string,
    countryName: string,
    clientName: string,
    clientSurname: string,
    yearManufacture: number | string
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
    year_manufacture: number
}