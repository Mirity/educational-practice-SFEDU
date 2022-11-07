import { CacheType } from "../abstracts/common.js";

type type = typeof CacheType;

export default class CreatorCache {
    static createCache<T extends keyof type>(type: T): type[T] {
        return CacheType[type];
    }
}