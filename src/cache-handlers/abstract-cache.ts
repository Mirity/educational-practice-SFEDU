import { ICache } from "../abstracts/common";


export default abstract class AbstractCache implements ICache {
    protected keyCache: string;

    constructor() {
        this.keyCache = '';
    }

    protected changeKeyCache(key: number | undefined, dataType: string): string {
        return this.keyCache = dataType + (key || '');
    }

    abstract save<T>(data: T, dataType: string, key?: number): Promise<void>

    abstract get<T>(dataType: string, key?: number): Promise<T | null>

    abstract delete(dataType: string, key?: number): Promise<void>

    abstract update<T>(data: T, dataType: string, key: number): Promise<void>
}