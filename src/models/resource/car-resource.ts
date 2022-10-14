import Database from "../../database.js";
import { CarFromForm, DbCar } from "../../abstracts/car"

export default class CarResource {
    private getCarsQuery = `select car.id, mileage, number, brand.name as brand_name, model, country.name as country_name, client.name as client_name, client.surname as client_surname, year_manifacture FROM car JOIN client ON client.id = client_id JOIN country ON country.id = country_id JOIN brand ON brand.id = brand_id`

    public async getCars(): Promise<DbCar[]> {
        return Database.makeQuery(`${this.getCarsQuery} GROUP BY id;`, null);
    }

    public async getCarById(id: number): Promise<DbCar | undefined> {
        const cars = await Database.makeQuery(`${this.getCarsQuery} WHERE car.id='${id}'`, null);

        return cars[0];
    }

    public async getOldCars(): Promise<DbCar[]> {
        return Database.makeQuery(`${this.getCarsQuery} where year_manifacture < 2010`, null);
    }

    public async addNewCar(params: CarFromForm) {
        const { mileage, number, brand, country, client_name, client_surname, model, year } = params;

        await Database.makeQuery(
            `INSERT INTO car (mileage, number, brand_id, model, country_id, client_id, year_manifacture) VALUES (?, ?, (select id from brand where name = '${brand}'), ?, (select id from country where name = '${country}'), (select id from client where name = '${client_name}' and surname = '${client_surname}'), ?)`,
            [mileage, number, model, year]);
    }

    public async editCarById(params: CarFromForm): Promise<void> {
        const { id, mileage, number, brand, country, client_name, client_surname, model, year } = params;

        await Database.makeQuery
            (`UPDATE car SET mileage = ?, number = ?, brand_id = (select id from brand where name = '${brand}'), model = ? , country_id = (select id from country where name = '${country}'), client_id = (select id from client where name = '${client_name}' and surname = '${client_surname}'), year_manifacture = ? WHERE id = ${id}`,
            [mileage, number, model, year])
    }

    public async getCarsByClientId(id: number): Promise<DbCar[]>{
        return await Database.makeQuery(`${this.getCarsQuery} WHERE client.id='${id}'`, null);
    }
}