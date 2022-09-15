import Database from "../../database.js";

export default class ServiceCenterResource {
    #getServiceCentersQuery = `SELECT service_center.id, service_center.name, street, house, number_seats, country.name AS country_name, city.name AS city_name FROM service_center JOIN country ON country.id = service_center.country_id JOIN city ON city.id = service_center.city_id`

    async getServiceCenters() {
        return Database.makeQuery(this.#getServiceCentersQuery);
    }

    async getServiceCenterById(id) {
        const serviceCenters = await Database.makeQuery(`${this.#getServiceCentersQuery} where service_center.id = '${id}'`);

        return serviceCenters[0];
    }

    async addNewServiceCenter(params) {
        const { name, country, city, street, house, number_seats } = params;

        await Database.makeQuery(
            `INSERT INTO service_center (name, country_id, city_id, street, house, number_seats) VALUES (?, (select id from country where name='${country}'), (select id from city where name='${city}'), ?, ?, ?)`,
            [name, street, house, number_seats]);
    }
}