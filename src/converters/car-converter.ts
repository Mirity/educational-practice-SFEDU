import { Car, DbCar } from "../abstracts/car";
import CarEntity from "../models/entity/car-entity.js";

export default class CarConverter {
    public static convertDbCar({ id, mileage, number, brand_name, model, country_name, client_name, client_surname, year_manufacture }: DbCar): Car {
        return {
            id,
            mileage,
            number,
            brandName: brand_name,
            model,
            countryName: country_name,
            clientName: client_name,
            clientSurname: client_surname,
            yearManufacture: year_manufacture
        }
    }

    public static convertDbCarToEntity (dbCar: DbCar): CarEntity {
        return new CarEntity(
            this.convertDbCar(dbCar)
        )
    }

    public static convertDbCarsToEntities(dbCars: DbCar[]): CarEntity[] {
        return dbCars.map(dbCar => this.convertDbCarToEntity(dbCar));
    }

    public static convertDbCars(dbCars: DbCar[]): Car[] {
        return dbCars.map(dbCar => this.convertDbCar(dbCar));
    }

    public static convertCarToEntity(car: Car): CarEntity {
        return new CarEntity(car);
    }

    public static convertCarsToEntities(cars: Car[]): CarEntity[] {
        return cars.map(car =>this.convertCarToEntity(car));
    }
}