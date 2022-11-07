import {DbServiceCenter, ServiceCenter} from "../abstracts/service-center";
import ServiceCenterEntity from "../models/entity/service-center-entity.js";

export default class ServiceCenterConverter {
    public static convertDbServiceCenter ({ id, name, street, house, number_seats, country_name, city_name }: DbServiceCenter): ServiceCenter {
        return {
            id,
            name,
            street,
            house,
            numberSeats: number_seats,
            countryName: country_name,
            cityName: city_name
        }
    }

    public static convertDbServiceCenterToEntity (dbServiceCenters: DbServiceCenter): ServiceCenterEntity {
        return new ServiceCenterEntity(
            this.convertDbServiceCenter(dbServiceCenters)
        )
    }

    public static convertDbServiceCentersToEntities(dbServiceCenters: DbServiceCenter[]): ServiceCenterEntity[] {
        return dbServiceCenters.map(dbServiceCenter => this.convertDbServiceCenterToEntity(dbServiceCenter));
    }

    public static convertDbServiceCenters(dbServiceCenters: DbServiceCenter[]): ServiceCenter[] {
        return dbServiceCenters.map(dbServiceCenter => this.convertDbServiceCenter(dbServiceCenter));
    }

    public static convertServiceCenterToEntity(serviceCenter: ServiceCenter): ServiceCenterEntity {
        return new ServiceCenterEntity(serviceCenter);
    }

    public static convertServiceCentersToEntities(serviceCenters: ServiceCenter[]): ServiceCenterEntity[] {
        return serviceCenters.map(serviceCenter =>this.convertServiceCenterToEntity(serviceCenter));
    }
}