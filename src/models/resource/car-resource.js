import Database from "../../database.js";

export default class CarResource {
    #selectQuery = `select car.id, mileage, number, brand.name as brand_name, model, country.name as country_name, client.name as client_name, client.surname as client_surname, year_manifacture FROM car JOIN client ON client.id = client_id JOIN country ON country.id = country_id JOIN brand ON brand.id = brand_id`

    async getCars() {
        return await Database.makeQuery(`${this.#selectQuery} GROUP BY id;`);
    }

    async getCarById(id) {
        const cars = await Database.makeQuery(`${this.#selectQuery} WHERE car.id='${id}'`);

        return cars[0];
    }

    async getOldCars() {
        return await Database.makeQuery(`${this.#selectQuery} where year_manifacture < 2010`);
    }

    async addNewCar(queryParams) {
        const { mileage, number, brand, country, client_name, client_surname, model, year } = queryParams;

        await Database.makeQuery(
            `INSERT INTO car (mileage, number, brand_id, model, country_id, client_id, year_manifacture) VALUES (?, ?, (select id from brand where name = '${brand}'), ?, (select id from country where name = '${country}'), (select id from client where name = '${client_name}' and surname = '${client_surname}'), ?)`,
            [mileage, number, model, year]);
    }

    async editCarById(queryParams) {
        const { id, mileage, number, brand, country, client_name, client_surname, model, year } = queryParams;

        await Database.makeQuery
            (`UPDATE car SET mileage = ?, number = ?, brand_id = (select id from brand where name = '${brand}'), model = ? , country_id = (select id from country where name = '${country}'), client_id = (select id from client where name = '${client_name}' and surname = '${client_surname}'), year_manifacture = ? WHERE id = ${id}`,
            [mileage, number, model, year])
    }
}