import { ICache } from "../abstracts/common";
import fs from "fs";
import AbstractCache from "./abstract-cache.js";


export default class FileCache extends AbstractCache implements ICache {
    private fileName: string;

    constructor() {
        super();

        fs.stat('./cache', async (err, stats) => {
            if (err) {
                await fs.promises.mkdir('./cache', {recursive: true})
            }
        })

        this.fileName = ``;
    }

    private createFileName(keyCache: string) {
        this.fileName = `./cache/${keyCache}.json`;
    }

    public async save<T>(data: T, fileName: string, key?: number) {
        this.createFileName(this.changeKeyCache(key, fileName));

        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify(data))
            console.log(`save cache info ${this.fileName}`)
        } catch {}
    }

    public async get<T>(fileName: string, key?: number ): Promise<T | null> {
        this.createFileName(this.changeKeyCache(key, fileName));

        try {
            const data = fs.promises.readFile(this.fileName, { encoding: 'utf-8' });

            return JSON.parse(await data) || null
        } catch {
            console.log(`no such file ${this.fileName}`);
            return null;
        }
    }

    public async delete(fileName: string, key?: number): Promise<void> {
        this.createFileName(this.changeKeyCache(key, fileName));

        try {
            await fs.promises.unlink(this.fileName);
            console.log(`delete info ${this.fileName}`);
        } catch {
            console.log(`no such file ${this.fileName}`);
        }
    }

    public async update<T>(data: T, fileName: string, key: number): Promise<void> {
        this.createFileName(this.changeKeyCache(key, fileName));

        try {
            await fs.promises.truncate(this.fileName);
            await fs.promises.writeFile(this.fileName, JSON.stringify(data));
            console.log(`update info ${this.fileName}`);
        } catch {
            console.log(`no such file ${this.fileName}`);
        }

    }
}