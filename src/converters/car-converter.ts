import { DbCar } from "../abstracts/car";
import CarEntity from "../models/entity/car-entity.js";

export default class CarConverter {
    public static convertDbCar ({ id, mileage, number, brand_name, model, country_name, client_name, client_surname, year_manufacture }: DbCar): CarEntity {
        return new CarEntity({
            id,
            mileage,
            number,
            brandName: brand_name,
            model,
            countryName: country_name,
            clientName: client_name,
            clientSurname: client_surname,
            yearManufacture: year_manufacture
        })
    }

    public static convertDbCars(dbCars: DbCar[]): CarEntity[] {
        return dbCars.map(this.convertDbCar);
    }

}