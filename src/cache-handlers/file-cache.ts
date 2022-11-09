import { ICache } from "../abstracts/common";
import fs from "fs";
import AbstractCache from "./abstract-cache.js";


export default class FileCache extends AbstractCache implements ICache {
    constructor() {
        super();

        fs.stat('./cache', async (err, stats) => {
            if (err) {
                await fs.promises.mkdir('./cache', {recursive: true})
            }
        })
    }


    protected changeKeyCache(key: number | undefined, dataType: string): string {
        return this.keyCache = `./cache/${super.changeKeyCache(key, dataType)}.json`;
    }

    public async save<T>(data: T, fileName: string, key?: number) {
        this.changeKeyCache(key, fileName);

        try {
            await fs.promises.writeFile(this.keyCache, JSON.stringify(data))
            console.log(`save cache info ${this.keyCache}`)
        } catch {}
    }

    public async get<T>(fileName: string, key?: number ): Promise<T | null> {
        this.changeKeyCache(key, fileName);

        try {
            const data = fs.promises.readFile(this.keyCache, { encoding: 'utf-8' });

            return JSON.parse(await data) || null
        } catch {
            console.log(`no such file ${this.keyCache}`);
            return null;
        }
    }

    public async delete(fileName: string, key?: number): Promise<void> {
        this.changeKeyCache(key, fileName);

        try {
            await fs.promises.unlink(this.keyCache);
            console.log(`delete info ${this.keyCache}`);
        } catch {
            console.log(`no such file ${this.keyCache}`);
        }
    }

    public async update<T>(data: T, fileName: string, key: number): Promise<void> {
        this.changeKeyCache(key, fileName);

        try {
            await fs.promises.truncate(this.keyCache);
            await fs.promises.writeFile(this.keyCache, JSON.stringify(data));
            console.log(`update info ${this.keyCache}`);
        } catch {
            console.log(`no such file ${this.keyCache}`);
        }

    }
}