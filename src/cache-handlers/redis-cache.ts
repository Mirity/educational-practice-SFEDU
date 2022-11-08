import { ICache } from "../abstracts/common";
import { createClient } from 'redis';


export default class RedisCache implements ICache {
    private keyRedis: string;
    private client = createClient();

    constructor() {
        this.keyRedis = ``;
        this.client.on('error', (err) => console.log('Redis Client Error', err));

        (async () => {
            await this.client.connect();
        })();
    }

    private changeKeyRedis(key: number | undefined, fileName: string) {
        if(key) {
            this.keyRedis = `${fileName}${key}`;
        } else {
            this.keyRedis = `${fileName}`;
        }
    }

    private async connectClient() {
        let isConnected = false;

        this.client.on('ready', () => {
            isConnected = true;
        })

        if(!isConnected) {
            try {
                await this.client.connect();
            } catch {}
        }
    }


    public async get<T>(dataType: string, key?: number): Promise<T | null> {
        this.changeKeyRedis(key, dataType);
        await this.connectClient();

        const data = this.client.get(this.keyRedis);

        if(data) {
            console.log(`get info ${this.keyRedis}`)
            return JSON.parse(<string>await data);
        }

        return null;
    }

    public async delete(dataType: string, key?: number): Promise<void> {
        this.changeKeyRedis(key, dataType);
        await this.connectClient();


        await this.client.del(this.keyRedis);
        console.log(`del info ${this.keyRedis}`)
    }

    public async save<T>(data: T, dataType: string, key?: number) {
        this.changeKeyRedis(key, dataType);
        await this.connectClient();

        await this.client.set(this.keyRedis, JSON.stringify(data));
        console.log(`save info ${this.keyRedis}`)
    }

    public async update<T>(data: T, dataType: string, key: number): Promise<void> {
        this.changeKeyRedis(key, dataType);
        await this.connectClient();


        await this.client.set(this.keyRedis, JSON.stringify(data));
        console.log(`update info ${this.keyRedis}`)
    }
}