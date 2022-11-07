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
        this.cache = new (CreatorCache.createCache(Environment.getCacheType()));
    }

    async getServiceCenterById(id: number): Promise<ServiceCenter> {
        try {
            const cachedServiceCenter = await this.cache.getCache(CACHE_TYPE_SERVICE_CENTER, id);

            if(cachedServiceCenter) {
                console.log(`get cache info ${id}`)
                return JSON.parse(cachedServiceCenter)
            }
        } catch {}

        const serviceCenterDb = await this.serviceCenterResource.getServiceCenterById(id);

        if(!serviceCenterDb) {
            throw new Error('No service center')
        }

        const serviceCenter = ServiceCenterConverter.convertDbServiceCenter(serviceCenterDb);

        await this.cache.saveCache<ServiceCenter>(serviceCenter, CACHE_TYPE_SERVICE_CENTER, id);

        return serviceCenter;
    }

    async getServiceCenters(): Promise<ServiceCenter[]> {
        try {
            const cachedServiceCenters = await this.cache.getCache(CACHE_TYPE_SERVICE_CENTERS);

            if(cachedServiceCenters) {
                console.log(`get cache info ${Date.now()}`)
                return JSON.parse(cachedServiceCenters)
            }
        } catch {}

        const serviceCentersDb = await this.serviceCenterResource.getServiceCenters();

        if(!serviceCentersDb) {
            throw new Error('No service centers')
        }

        const serviceCenters = ServiceCenterConverter.convertDbServiceCenters(serviceCentersDb);

        await this.cache.saveCache<ServiceCenter[]>(serviceCenters, CACHE_TYPE_SERVICE_CENTERS);

        return serviceCenters;
    }

    public async postServiceCenter(params: ServiceCenter): Promise<void> {
        let dbQueryInfo;
        try {
            dbQueryInfo = await this.serviceCenterResource.addNewServiceCenter(params);
        } catch (err) {
            throw new Error('Bad request');
        }

        await this.cache.saveCache<ServiceCenter>(params, CACHE_TYPE_SERVICE_CENTER, dbQueryInfo.insertId)
        await this.cache.deleteCache(CACHE_TYPE_SERVICE_CENTERS);
    }

    public async putServiceCenter(params: ServiceCenter, id: number) {
        try{
            await this.getServiceCenterById(id);
        } catch {
            throw new Error('No service center')
        }

        try {
            await this.serviceCenterResource.editServiceCenter(params);

            await this.cache.updateCache<ServiceCenter>(params, CACHE_TYPE_SERVICE_CENTER, id);
            await this.cache.deleteCache(CACHE_TYPE_SERVICE_CENTERS);

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
            await this.cache.deleteCache(CACHE_TYPE_SERVICE_CENTER, id);
            await this.cache.deleteCache(CACHE_TYPE_SERVICE_CENTERS);
        } catch (err) {
            throw new Error('Bad request');
        }
    }
}
