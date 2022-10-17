export interface ServiceCenter {
    id?: number | string,
    name: string,
    street: string,
    house: number | string,
    numberSeats: number | string,
    countryName: string,
    cityName: string
}

export interface DbServiceCenter {
    id: number,
    name: string,
    street: string,
    house: number,
    number_seats: number,
    country_name: string,
    city_name: string
}