import {CacheRuntimeTypeData, DataTypes, ICache} from "../abstracts/common";

let cacheData: CacheRuntimeTypeData = {
    car: {1: undefined},
    cars: {1: undefined},
    serviceCenter: {1: undefined},
    serviceCenters: {1: undefined},
    serviceRecord: {1: undefined},
    serviceRecords: {1: undefined},
    clientCars: {1: undefined},
    oldCars: {1: undefined},
    clientRecords: {1: undefined},
};

export default class RuntimeCache implements ICache {
    public async saveCache<T extends DataTypes>(data: T, dataType: keyof CacheRuntimeTypeData, key?: number): Promise<void> {
        if (key) {
            cacheData[dataType][key] = data;

            console.log(`save cache ${dataType} with key: ${key}`, cacheData[dataType][key]);
            return;
        }

        cacheData[dataType][1] = data;
        console.log(`save cache ${dataType} without key:`);
    }

    public async getCache(dataType: keyof CacheRuntimeTypeData, key?: number): Promise<string | null> {
        if(key) {
            const data = JSON.stringify(cacheData[dataType][key]);

            if(data) {
                return data;
            }
        }

        if(!key) {
            const data = JSON.stringify(cacheData[dataType][1]);

            if(data) {
                return data;
            }
        }

        return null;
    }

    public async deleteCache(dataType: keyof CacheRuntimeTypeData, key?: number): Promise<void> {
        if(key) {
            cacheData[dataType][key] = undefined;
            console.log(`delete cache ${dataType} with key: ${key}`, cacheData[dataType][key]);

            return;
        }
        cacheData[dataType][1] = undefined;
        console.log(`delete cache ${dataType} without key`, cacheData[dataType][1]);

    }

    public async updateCache<T extends DataTypes>(data: T, dataType: keyof CacheRuntimeTypeData, key: number): Promise<void> {
       cacheData[dataType][key] = data;
       console.log(`update cache ${dataType} with key: ${key}`, cacheData[dataType][key]);
    }
}