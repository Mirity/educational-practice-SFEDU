import { ICache } from "../abstracts/common";
import {createClient, RedisClientType, RedisDefaultModules, RedisFunctions, RedisModules, RedisScripts} from 'redis';

const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
    await client.connect();
})();


export default class RedisCache implements ICache {
    private keyRedis: string;

    constructor() {
        this.keyRedis = ``;
    }

    private changeKeyRedis(key: number | undefined, fileName: string) {
        if(key) {
            this.keyRedis = `${fileName}${key}`;
        } else {
            this.keyRedis = `${fileName}`;
        }
    }


    public async get<T>(dataType: string, key?: number): Promise<T | null> {
        this.changeKeyRedis(key, dataType);

        const data = client.get(this.keyRedis);

        if(data) {
            console.log(`get info ${this.keyRedis}`)
            return JSON.parse(<string>await data);
        }

        return null;
    }

    public async delete(dataType: string, key?: number): Promise<void> {
        this.changeKeyRedis(key, dataType);

        await client.del(this.keyRedis);
        console.log(`del info ${this.keyRedis}`)
    }

    public async save<T>(data: T, dataType: string, key?: number) {
        this.changeKeyRedis(key, dataType);

        const dataJSON: any = JSON.stringify(data);
        await client.set(this.keyRedis, dataJSON);
        console.log(`save info ${this.keyRedis}`)
    }

    public async update<T>(data: T, dataType: string, key: number): Promise<void> {
        this.changeKeyRedis(key, dataType);

        await client.set(this.keyRedis, JSON.stringify(data));
        console.log(`update info ${this.keyRedis}`)
    }
}