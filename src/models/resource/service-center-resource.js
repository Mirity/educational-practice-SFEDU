import Database from "../../database.js";

export default class ServiceCenterResource {
    async getServiceCenters() {
        return await Database.makeQuery(`SELECT m1.id, m1.name, m1.surname, m2.name AS head_master_name, m2.surname AS head_master_surname, service_center.name AS service_center_name FROM master as m1 JOIN master AS m2 ON m2.id = m1.head_master_id JOIN service_center ON m1.service_center_id = service_center.id;`);
    }

    async getServiceCenterById(id) {
        const serviceCenters = await Database.makeQuery(`SELECT service_center.id, service_center.name, street, house, number_seats, country.name AS country_name, city.name AS city_name FROM service_center JOIN country ON country.id = service_center.country_id JOIN city ON city.id = service_center.city_id where service_center.id = '${id}'`);

        return serviceCenters[0];
    }

    async postServiceCenter(req) {
        const {name, country, city, street, house, number_seats} = req.body;

        await Database.makeQuery(
            `INSERT INTO service_center (name, country_id, city_id, street, house, number_seats) VALUES (?, (select id from country where name='${country}'), (select id from city where name='${city}'), ?, ?, ?)`,
            [name, street, house, number_seats]);
    }
}