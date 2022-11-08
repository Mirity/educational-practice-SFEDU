import { CacheType } from "../abstracts/common.js";
import FileCache from "./file-cache.js";
import RuntimeCache from "./runtime-cache.js";
import RedisCache from "./redis-cache.js";


export default class CreatorCache {
    static createCache(type: CacheType | undefined) {
        if(type === CacheType.file) {
            return new FileCache();
        }

        if(type === CacheType.runtime) {
            return new RuntimeCache();
        }

        if(type === CacheType.redis) {
            return new RedisCache();
        }

        throw new Error('Invalid cache type in env file')
    }
}