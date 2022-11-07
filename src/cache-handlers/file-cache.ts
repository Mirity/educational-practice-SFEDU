import {CacheRuntimeTypeData, DataTypes, ICache} from "../abstracts/common";
import fs from "fs";



export default class FileCache implements ICache {
    constructor() {
        fs.stat('./cache', async (err, stats) => {
            if (err) {
                await fs.promises.mkdir('./cache', {recursive: true})
            }
        })
    }

    public async saveCache<T extends DataTypes>(data: T, fileName: keyof CacheRuntimeTypeData, key?: number) {
        if(key) {
            await fs.promises.writeFile(`./cache/${fileName}${key}.json`, JSON.stringify(data))
            console.log(`save cache info ${fileName}${key}`)

            return;
        }

        await fs.promises.writeFile(`./cache/${fileName}.json`, JSON.stringify(data))
        console.log(`save cache info ${fileName}${Date.now()}`)

    }

    public async getCache(fileName: keyof CacheRuntimeTypeData, key?: number ): Promise<string | null> {
        if(key){
            const data = fs.promises.readFile(`./cache/${fileName}${key}.json`, { encoding: 'utf-8' });

            if(data) {
                return data;
            }
        }

        if(!key) {
            const data = fs.promises.readFile(`./cache/${fileName}.json`, { encoding: 'utf-8' });

            if(data) {
                return data;
            }
        }

        return null;
    }

    public async deleteCache(fileName: keyof CacheRuntimeTypeData, key?: number): Promise<void> {
        if (key) {
            await fs.access(`./cache/${fileName}${key}.json`, async (err) => {
                if (err) {
                    console.log(err.message)

                    console.log(`err ${fileName}${key}`)
                    return;
                }

                await fs.promises.unlink(`./cache/${fileName}${key}.json`);
                console.log(`delete info ${fileName}${key}`)
            })

            return;
        }

        await fs.access(`./cache/${fileName}.json`, async (err) => {
            if (err) {
                console.log(err.message)

                return;
            }

            await fs.promises.unlink(`./cache/${fileName}.json`);
            console.log(`delete info ${fileName}`)
        })
    }

    public async updateCache<T extends DataTypes>(data: T, fileName: keyof CacheRuntimeTypeData, key: number): Promise<void> {
        await fs.access(`./cache/${fileName}${key}.json`, async (err) => {
            if (err) {
                console.log(err.message)

                return;
            }
            console.log(`update info ${fileName}${key}`)
            await fs.promises.truncate(`./cache/${fileName}${key}.json`);
            await fs.promises.writeFile(`./cache/${fileName}${key}.json`, JSON.stringify(data))
        })
    }
}