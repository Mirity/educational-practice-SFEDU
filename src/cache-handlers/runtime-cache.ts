import { ICache, IRuntimeCache } from "../abstracts/common";

let cacheData: IRuntimeCache = {};

export default class RuntimeCache implements ICache {
    private keyRuntime: string;

    constructor() {
        this.keyRuntime = ``;
    }

    private changeKeyRuntime(key: number | undefined, dataType: string) {
        if(key) {
            this.keyRuntime = `${dataType}${key}`;
        } else {
            this.keyRuntime = `${dataType}`;
        }
    }

    public async save<T>(data: T, dataType: string, key?: number): Promise<void> {
        this.changeKeyRuntime(key, dataType);
        cacheData[this.keyRuntime] = data;
        console.log(`save cache ${this.keyRuntime}`, cacheData[this.keyRuntime]);
    }

    public async get<T>(dataType: string, key?: number): Promise<T | null> {
        this.changeKeyRuntime(key, dataType);
        const data = cacheData[this.keyRuntime];

        if(data) {
            return data;
        }

        return null;
    }

    public async delete(dataType: string, key?: number): Promise<void> {
        this.changeKeyRuntime(key, dataType);

        delete cacheData[this.keyRuntime];
        console.log(`delete cache ${this.keyRuntime}`, cacheData[this.keyRuntime]);
    }

    public async update<T>(data: T, dataType: string, key: number): Promise<void> {
        this.changeKeyRuntime(key, dataType);

        cacheData[this.keyRuntime] = data;
        console.log(`update cache ${this.keyRuntime} `, cacheData[this.keyRuntime]);
    }
}