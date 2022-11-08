import CreatorCache from "../../cache-handlers/creator-cache.js";
import Environment from "../environment.js";
import FileCache from "../../cache-handlers/file-cache.js";
import RuntimeCache from "../../cache-handlers/runtime-cache.js";
import RedisCache from "../../cache-handlers/redis-cache.js";
import ServiceCenterResource from "../resource/service-center-resource.js";
import { ServiceCenter } from "../../abstracts/service-center";
import ServiceCenterConverter from "../../converters/service-center-converter.js";


const CACHE_TYPE_SERVICE_CENTER = 'serviceCenter';
const CACHE_TYPE_SERVICE_CENTERS = 'serviceCenters'

export default class ServiceCenterProvider {
    private serviceCenterResource: ServiceCenterResource;
    private cache: FileCache | RuntimeCache | RedisCache;

    constructor() {
        this.serviceCenterResource = new ServiceCenterResource();
        this.cache = CreatorCache.createCache(Environment.getCacheType());
    }

    async getServiceCenterById(id: number): Promise<ServiceCenter> {
        const cachedServiceCenter = await this.cache.get<ServiceCenter>(CACHE_TYPE_SERVICE_CENTER, id);

        if(cachedServiceCenter) {
            console.log(`get cache info ${id}`)
            return cachedServiceCenter;
        }


        const serviceCenterDb = await this.serviceCenterResource.getServiceCenterById(id);

        if(!serviceCenterDb) {
            throw new Error('No service center')
        }

        const serviceCenter = ServiceCenterConverter.convertDbServiceCenter(serviceCenterDb);

        await this.cache.save<ServiceCenter>(serviceCenter, CACHE_TYPE_SERVICE_CENTER, id);

        return serviceCenter;
    }

    async getServiceCenters(): Promise<ServiceCenter[]> {
        const cachedServiceCenters = await this.cache.get<ServiceCenter[]>(CACHE_TYPE_SERVICE_CENTERS);

        if(cachedServiceCenters) {
            console.log(`get cache info ${Date.now()}`)
            return cachedServiceCenters;
        }

        const serviceCentersDb = await this.serviceCenterResource.getServiceCenters();

        if(!serviceCentersDb) {
            throw new Error('No service centers')
        }

        const serviceCenters = ServiceCenterConverter.convertDbServiceCenters(serviceCentersDb);

        await this.cache.save<ServiceCenter[]>(serviceCenters, CACHE_TYPE_SERVICE_CENTERS);

        return serviceCenters;
    }

    public async postServiceCenter(params: ServiceCenter): Promise<void> {
        let dbQueryInfo;

        try {
            dbQueryInfo = await this.serviceCenterResource.addNewServiceCenter(params);
        } catch (err) {
            throw new Error('Bad request');
        }

        params.id = dbQueryInfo.insertId;

        await this.cache.save<ServiceCenter>(params, CACHE_TYPE_SERVICE_CENTER, dbQueryInfo.insertId)
        await this.cache.delete(CACHE_TYPE_SERVICE_CENTERS);
    }

    public async putServiceCenter(params: ServiceCenter) {
        if(params.id === undefined) {
            throw new Error('Id is undefined')
        }

        try{
            await this.getServiceCenterById(+params.id);
        } catch {
            throw new Error('Record by this id not found')
        }

        try {
            await this.serviceCenterResource.editServiceCenter(params);

            await this.cache.update<ServiceCenter>(params, CACHE_TYPE_SERVICE_CENTER, +params.id);
            await this.cache.delete(CACHE_TYPE_SERVICE_CENTERS);

        } catch (err) {
            throw new Error('Bad request');
        }
    }

    public async deleteServiceCenter(id: number) {
        try{
            await this.getServiceCenterById(id);
        } catch {
            throw new Error('No service center')
        }

        try {
            await this.serviceCenterResource.deleteServiceCenter(id);
            await this.cache.delete(CACHE_TYPE_SERVICE_CENTER, id);
            await this.cache.delete(CACHE_TYPE_SERVICE_CENTERS);
        } catch (err) {
            throw new Error('Bad request');
        }
    }
}
