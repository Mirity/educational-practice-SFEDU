import { ICache } from "../abstracts/common";
import { createClient } from 'redis';
import AbstractCache from "./abstract-cache.js";


export default class RedisCache extends AbstractCache implements ICache {
    private client = createClient();
    private isConnected: boolean = false;

    constructor() {
        super();
        this.client.on('error', (err) => {
            this.isConnected = false;

            console.log('Redis Client Error', err);
        });
    }


    private async connectClient() {
        this.client.on('ready', () => {
            this.isConnected = true;
        })

        if(!this.isConnected) {
            await this.client.connect();
        }
    }


    public async get<T>(dataType: string, key?: number): Promise<T | null> {
        this.changeKeyCache(key, dataType);
        await this.connectClient();

        const data = this.client.get(this.keyCache);

        return JSON.parse(<string>await data) || null;
    }

    public async delete(dataType: string, key?: number): Promise<void> {
        this.changeKeyCache(key, dataType);
        await this.connectClient();


        await this.client.del(this.keyCache);
        console.log(`del info ${this.keyCache}`)
    }

    public async save<T>(data: T, dataType: string, key?: number) {
        this.changeKeyCache(key, dataType);
        await this.connectClient();

        await this.client.set(this.keyCache, JSON.stringify(data));
        console.log(`save info ${this.keyCache}`)
    }

    public async update<T>(data: T, dataType: string, key: number): Promise<void> {
        this.changeKeyCache(key, dataType);
        await this.connectClient();


        await this.client.set(this.keyCache, JSON.stringify(data));
        console.log(`update info ${this.keyCache}`)
    }
}