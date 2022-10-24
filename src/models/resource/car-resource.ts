import Database from "../../database.js";
import { Car, DbCar } from "../../abstracts/car"

export default class CarResource {
    private getCarsQuery = `select car.id, mileage, number, brand.name as brand_name, model, country.name as country_name, client.name as client_name, client.surname as client_surname, year_manufacture FROM car JOIN client ON client.id = client_id JOIN country ON country.id = country_id JOIN brand ON brand.id = brand_id`

    public async getCars(): Promise<DbCar[]> {
        return Database.makeQuery<DbCar[]>(`${this.getCarsQuery} GROUP BY id;`, null);
    }

    public async getCarById(id: number): Promise<DbCar | undefined> {
        const cars = await Database.makeQuery<DbCar[]>(`${this.getCarsQuery} WHERE car.id='${id}'`, null);

        return cars[0];
    }

    public async getOldCars(): Promise<DbCar[]> {
        return Database.makeQuery<DbCar[]>(`${this.getCarsQuery} where year_manufacture < 2010`, null);
    }

    public async addNewCar(params: Car) {
        const { mileage, number, brandName, countryName, clientName, clientSurname, model, yearManufacture } = params;

        await Database.makeQuery(
            `INSERT INTO car (mileage, number, brand_id, model, country_id, client_id, year_manufacture) VALUES (?, ?, (select id from brand where name = '${brandName}'), ?, (select id from country where name = '${countryName}'), (select id from client where name = '${clientName}' and surname = '${clientSurname}'), ?)`,
            [mileage, number, model, yearManufacture]);
    }

    public async editCarById(params: Car): Promise<void> {
        const { id, mileage, number, brandName, countryName, clientName, clientSurname, model, yearManufacture } = params;

        await Database.makeQuery
            (`UPDATE car SET mileage = ?, number = ?, brand_id = (select id from brand where name = '${brandName}'), model = ? , country_id = (select id from country where name = '${countryName}'), client_id = (select id from client where name = '${clientName}' and surname = '${clientSurname}'), year_manufacture = ? WHERE id = ${id}`,
            [mileage, number, model, yearManufacture])
    }

    public async getCarsByClientId(id: number): Promise<DbCar[]>{
        return Database.makeQuery<DbCar[]>(`${this.getCarsQuery} WHERE client.id='${id}'`, null);
    }

    public async deleteCar(id: number): Promise<void> {
        await Database.makeQuery(`DELETE FROM car WHERE id = ${id}`, null);
    }
}