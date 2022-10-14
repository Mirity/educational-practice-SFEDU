export interface ServiceCenterFromForm {
    csrf_token: string,
    name: string,
    country: string,
    city: string,
    street: string,
    house: string,
    number_seats: string
}

export interface ServiceCenter {
    id: number,
    name: string,
    street: string,
    house: number,
    numberSeats: number,
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