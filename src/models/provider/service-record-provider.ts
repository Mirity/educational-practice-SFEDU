import CreatorCache from "../../cache-handlers/creator-cache.js";
import Environment from "../environment.js";
import FileCache from "../../cache-handlers/file-cache.js";
import RuntimeCache from "../../cache-handlers/runtime-cache.js";
import RedisCache from "../../cache-handlers/redis-cache.js";
import ServiceRecordResource from "../resource/service-record-resource.js";
import ServiceRecordConverter from "../../converters/service-record-converter.js";
import { ServiceRecord } from "../../abstracts/service-record";


const CACHE_TYPE_SERVICE_RECORD = 'serviceRecord';
const CACHE_TYPE_SERVICE_RECORDS = 'serviceRecords'
const CACHE_TYPE_CLIENT_RECORDS = 'clientRecords'

export default class ServiceRecordProvider {
    private serviceRecordResource: ServiceRecordResource;
    private cache: FileCache | RuntimeCache | RedisCache;

    constructor() {
        this.serviceRecordResource = new ServiceRecordResource();
        this.cache = new (CreatorCache.createCache(Environment.getCacheType()));
    }

    async getServiceRecordById(id: number): Promise<ServiceRecord> {
        try {
            const cachedServiceRecord = await this.cache.getCache(CACHE_TYPE_SERVICE_RECORD, id);

            if(cachedServiceRecord) {
                console.log(`get cache info ${id}`)
                return JSON.parse(cachedServiceRecord)
            }
        } catch {}

        const serviceRecordDb = await this.serviceRecordResource.getServiceRecordById(id);

        if(!serviceRecordDb) {
            throw new Error('No service record')
        }

        const serviceRecord = ServiceRecordConverter.convertDbServiceRecord(serviceRecordDb);

        await this.cache.saveCache<ServiceRecord>(serviceRecord, CACHE_TYPE_SERVICE_RECORD, id);

        return serviceRecord;
    }

    async getServiceRecords(): Promise<ServiceRecord[]> {
        try {
            const cachedServiceRecords = await this.cache.getCache(CACHE_TYPE_SERVICE_RECORDS);

            if(cachedServiceRecords) {
                console.log(`get cache info ${Date.now()}`)
                return JSON.parse(cachedServiceRecords)
            }
        } catch {}

        const serviceRecordsDb = await this.serviceRecordResource.getServiceRecords();

        if(!serviceRecordsDb) {
            throw new Error('No service records')
        }

        const serviceRecords = ServiceRecordConverter.convertDbServiceRecords(serviceRecordsDb);

        await this.cache.saveCache<ServiceRecord[]>(serviceRecords, CACHE_TYPE_SERVICE_RECORDS);

        return serviceRecords;
    }

    public async postServiceRecord(params: ServiceRecord): Promise<void> {
        let dbQueryInfo;
        try {
            dbQueryInfo = await this.serviceRecordResource.addNewServiceRecord(params);
        } catch (err) {
            throw new Error('Bad request');
        }

        if(dbQueryInfo.insertId !== undefined) {
            const clientId = await this.serviceRecordResource.getClientIdByRecordId(dbQueryInfo.insertId);

            if(clientId) {
                await this.cache.deleteCache(CACHE_TYPE_CLIENT_RECORDS, clientId);
            }
        }

        await this.cache.saveCache<ServiceRecord>(params, CACHE_TYPE_SERVICE_RECORD, dbQueryInfo.insertId)
        await this.cache.deleteCache(CACHE_TYPE_SERVICE_RECORDS);
    }

    public async putServiceRecord(params: ServiceRecord, id: number) {
        try{
            await this.getServiceRecordById(id);
        } catch {
            throw new Error('No service record')
        }

        try {
            await this.serviceRecordResource.editServiceRecordById(params);

            if(params.id !== undefined) {
                const clientId = await this.serviceRecordResource.getClientIdByRecordId(+params.id);
                await this.cache.deleteCache(CACHE_TYPE_CLIENT_RECORDS, clientId);
            }

            await this.cache.updateCache<ServiceRecord>(params, CACHE_TYPE_SERVICE_RECORD, id);
            await this.cache.deleteCache(CACHE_TYPE_SERVICE_RECORDS);

        } catch (err) {
            throw new Error('Bad request');
        }
    }

    public async deleteServiceRecord(id: number) {
        try{
            await this.getServiceRecordById(id);
        } catch {
            throw new Error('No service record')
        }

        try {
            const clientId = await this.serviceRecordResource.getClientIdByRecordId(id);

            await this.cache.deleteCache(CACHE_TYPE_CLIENT_RECORDS, clientId);
            await this.serviceRecordResource.deleteServiceRecord(id);
            await this.cache.deleteCache(CACHE_TYPE_SERVICE_RECORD, id);
            await this.cache.deleteCache(CACHE_TYPE_SERVICE_RECORDS);
        } catch (err) {
            throw new Error('Bad request');
        }
    }

    public async getRecordsByClientId(userId: number): Promise<ServiceRecord[]> {
        try {
            const cachedRecords = await this.cache.getCache(CACHE_TYPE_CLIENT_RECORDS, userId);

            if(cachedRecords) {
                return JSON.parse(cachedRecords)
            }
        } catch {}

        const serviceRecordsDb = await this.serviceRecordResource.getServiceRecordsByClientId(userId);

        if(!serviceRecordsDb) {
            throw new Error('No service records')
        }

        const serviceRecords = ServiceRecordConverter.convertDbServiceRecords(serviceRecordsDb);

        await this.cache.saveCache<ServiceRecord[]>(serviceRecords, CACHE_TYPE_CLIENT_RECORDS, userId);

        return serviceRecords;
    }
}