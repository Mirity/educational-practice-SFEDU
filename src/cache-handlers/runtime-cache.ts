import { ICache, IRuntimeCache } from "../abstracts/common";
import AbstractCache from "./abstract-cache.js";

let cacheData: IRuntimeCache = {};

export default class RuntimeCache extends AbstractCache implements ICache {
    public async save<T>(data: T, dataType: string, key?: number): Promise<void> {
        this.changeKeyCache(key, dataType);

        cacheData[this.keyCache] = data;
        console.log(`save cache ${this.keyCache}`, cacheData[this.keyCache]);
    }

    public async get<T>(dataType: string, key?: number): Promise<T | null> {
        this.changeKeyCache(key, dataType);
        const data = cacheData[this.keyCache];

        return data || null
    }

    public async delete(dataType: string, key?: number): Promise<void> {
        this.changeKeyCache(key, dataType);

        delete cacheData[this.keyCache];
        console.log(`delete cache ${this.keyCache}`, cacheData[this.keyCache]);
    }

    public async update<T>(data: T, dataType: string, key: number): Promise<void> {
        this.changeKeyCache(key, dataType);

        cacheData[this.keyCache] = data;
        console.log(`update cache ${this.keyCache} `, cacheData[this.keyCache]);
    }
}