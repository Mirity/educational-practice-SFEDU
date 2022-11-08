import { ICache } from "../abstracts/common";
import fs from "fs";


export default class FileCache implements ICache {
    private fileName: string;

    constructor() {
        fs.stat('./cache', async (err, stats) => {
            if (err) {
                await fs.promises.mkdir('./cache', {recursive: true})
            }
        })

        this.fileName = ``;
    }

    private changeFileName(key: number | undefined, fileName: string) {
        if(key) {
            this.fileName = `./cache/${fileName}${key}.json`;
        } else {
            this.fileName = `./cache/${fileName}.json`;
        }
    }

    public async save<T>(data: T, fileName: string, key?: number) {
        this.changeFileName(key, fileName);

        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify(data))
            console.log(`save cache info ${this.fileName}`)
        } catch {}
    }

    public async get<T>(fileName: string, key?: number ): Promise<T | null> {
        this.changeFileName(key, fileName);

        try {
            const data = fs.promises.readFile(this.fileName, { encoding: 'utf-8' });

            if(data) {
                return JSON.parse(await data);
            }

            return null;
        } catch {
            console.log(`no such file ${this.fileName}`);
            return null;
        }
    }

    public async delete(fileName: string, key?: number): Promise<void> {
        this.changeFileName(key, fileName);

        try {
            await fs.promises.unlink(this.fileName);
            console.log(`delete info ${this.fileName}`);
        } catch {
            console.log(`no such file ${this.fileName}`);
        }
    }

    public async update<T>(data: T, fileName: string, key: number): Promise<void> {
        this.changeFileName(key, fileName);

        try {
            await fs.promises.truncate(this.fileName);
            await fs.promises.writeFile(this.fileName, JSON.stringify(data));
            console.log(`update info ${this.fileName}`);
        } catch {
            console.log(`no such file ${this.fileName}`);
        }

    }
}