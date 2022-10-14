import { DbCar, Car } from "../abstracts/car";

export default class CarConverter {
    public static convertDbCar ({id, mileage, number, brand_name, model, country_name, client_name, client_surname, year_manifacture}: DbCar): Car {
        return {
            id,
            mileage,
            number,
            brandName: brand_name,
            model,
            countryName: country_name,
            clientName: client_name,
            clientSurname: client_surname,
            yearManifacture: year_manifacture
        }
    }

    public static convertDbCars(dbCars: DbCar[]): Car[] {
        return dbCars.map(this.convertDbCar);
    }

}