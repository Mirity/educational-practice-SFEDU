import {CacheRuntimeTypeData, DataTypes, ICache} from "../abstracts/common";
import {createClient, RedisClientType, RedisDefaultModules, RedisFunctions, RedisModules, RedisScripts} from 'redis';


export default class RedisCache implements ICache {
    private client: RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts> = createClient();

    constructor() {
        this.client.on('error', (err) => console.log('Redis Client Error', err));

        (async () => {
            await this.client.connect();
        })();
    }

    public async getCache(dataType: keyof CacheRuntimeTypeData, key?: number): Promise<string | null> {
        if(key) {
            const keyRedis: any = `${dataType}${key}`;
            const data = this.client.get(keyRedis);

            if(data) {
                return data;
            }
        }

        if(!key) {
            const keyRedis: any = `${dataType}`;
            const data = this.client.get(keyRedis);

            if(data) {
                return data;
            }
        }

        return null;
    }

    public async deleteCache(dataType: keyof CacheRuntimeTypeData, key?: number): Promise<void> {
        if(key) {
            const keyRedis: any = `${dataType}${key}`;
            await this.client.del(keyRedis);
            console.log(`del info ${dataType}${key}`)

            return;
        }
        const keyRedis: any = `${dataType}`;
        await this.client.del(keyRedis);
        console.log(`del info ${dataType}`)

    }

    public async saveCache<T extends DataTypes>(data: T, dataType: keyof CacheRuntimeTypeData, key?: number) {
        if(key) {
            const keyRedis: any = `${dataType}${key}`;
            const dataJSON: any = JSON.stringify(data);
            await this.client.set(keyRedis, dataJSON);
            console.log(`save info ${dataType}${key}`)

            return;
        }
        const keyRedis: any = `${dataType}`;
        const dataJSON: any = JSON.stringify(data);
        await this.client.set(keyRedis, dataJSON);
        console.log(`save info ${dataType}`)
    }

    public async updateCache<T extends DataTypes>(data: T, dataType: keyof CacheRuntimeTypeData, key: number): Promise<void> {
        const keyRedis: any = `${dataType}${key}`;
        const dataJSON: any = JSON.stringify(data);

        await this.client.set(keyRedis, dataJSON);
        console.log(`update info ${dataType}${key}`)
    }
}