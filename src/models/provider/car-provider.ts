import CarResource from "../resource/car-resource.js";
import CarConverter from "../../converters/car-converter.js";
import { Car } from "../../abstracts/car";
import CreatorCache from "../../cache-handlers/creator-cache.js";
import Environment from "../environment.js";
import FileCache from "../../cache-handlers/file-cache.js";
import RuntimeCache from "../../cache-handlers/runtime-cache.js";
import RedisCache from "../../cache-handlers/redis-cache.js";


const CACHE_TYPE_CARS = 'cars';
const CACHE_TYPE_CAR = 'car'
const CACHE_TYPE_CLIENT_CARS = 'clientCars';
const CACHE_TYPE_OLD_CARS = 'oldCars';

export default class CarProvider {
    private carResource: CarResource;
    private cache: FileCache | RuntimeCache | RedisCache;

    constructor() {
        this.carResource = new CarResource();
        this.cache = CreatorCache.createCache(Environment.getCacheType());
    }

    async getCarById(id: number): Promise<Car> {
        const cachedCar = await this.cache.get<Car>(CACHE_TYPE_CAR, id);

        if(cachedCar) {
            console.log(`get cache car ${id}`)
            return cachedCar;
        }

        const carDb = await this.carResource.getCarById(id);

        if(!carDb) {
            throw new Error('No car')
        }

        const car = CarConverter.convertDbCar(carDb);

        await this.cache.save<Car>(car, CACHE_TYPE_CAR, id);

        return car;
    }

    async getCars(): Promise<Car[]> {
        const cachedCars = await this.cache.get<Car[]>(CACHE_TYPE_CARS);

        if(cachedCars) {
            console.log(`get cache cars ${Date.now()}`)

            return cachedCars;
        }

        const carsDb = await this.carResource.getCars();

        if(!carsDb) {
            throw new Error('No cars')
        }

        const cars = CarConverter.convertDbCars(carsDb);

        await this.cache.save<Car[]>(cars, CACHE_TYPE_CARS);

        return cars;
    }

    public async postCar(params: Car): Promise<void> {
        let dbQueryInfo;
        try {
            dbQueryInfo = await this.carResource.addNewCar(params);
        } catch (err) {
           throw new Error('Bad request');
        }

        if(dbQueryInfo.insertId !== undefined) {
            const clientId = await this.carResource.getClientIdByCarId(dbQueryInfo.insertId);
            await this.cache.delete(CACHE_TYPE_CLIENT_CARS, clientId);
        }

        params.id = dbQueryInfo.insertId;

        await this.cache.save<Car>(params, CACHE_TYPE_CAR, dbQueryInfo.insertId)
        await this.cache.delete(CACHE_TYPE_CARS);
        await this.cache.delete(CACHE_TYPE_OLD_CARS);
    }

    public async putCar(params: Car) {
        if(params.id === undefined) {
            throw new Error('Id is undefined')
        }

        try {
            await this.getCarById(+params.id);
        } catch(err: any) {
            throw new Error('Record by this id not found');
        }

        try {
            await this.carResource.editCarById(params);

            const clientId = await this.carResource.getClientIdByCarId(+params.id);

            await this.cache.delete(CACHE_TYPE_CLIENT_CARS, clientId);


            await this.cache.update<Car>(params, CACHE_TYPE_CAR, +params.id);
            await this.cache.delete(CACHE_TYPE_CARS);
            await this.cache.delete(CACHE_TYPE_OLD_CARS);

        } catch (err) {
            throw new Error('Bad request');
        }
    }

    public async deleteCar(id: number) {
        try {
            await this.getCarById(id);
        } catch {
            throw new Error('No car with this id')
        }

        try {
            const clientId = await this.carResource.getClientIdByCarId(id);

            await this.cache.delete(CACHE_TYPE_CLIENT_CARS, clientId);
            await this.carResource.deleteCar(id);
            await this.cache.delete(CACHE_TYPE_CAR, id);
            await this.cache.delete(CACHE_TYPE_CARS);
            await this.cache.delete(CACHE_TYPE_OLD_CARS);

        } catch (err) {
            throw new Error('Bad request');
        }
    }

    public async getCarsByClientId(userId: number): Promise<Car[]> {
        const cachedCars = await this.cache.get<Car[]>(CACHE_TYPE_CLIENT_CARS, userId);

        if(cachedCars) {
            console.log(`get cache client car ${Date.now()}`)

            return cachedCars;
        }

        const carsDb = await this.carResource.getCarsByClientId(userId);

        if(!carsDb) {
            throw new Error('No cars')
        }

        const cars = CarConverter.convertDbCars(carsDb);

        await this.cache.save<Car[]>(cars, CACHE_TYPE_CLIENT_CARS, userId);

        return cars;
    }

    public async getOldCars(): Promise<Car[]> {
        const cachedCars = await this.cache.get<Car[]>(CACHE_TYPE_OLD_CARS);

        if(cachedCars) {
            return cachedCars;
        }

        const carsDb = await this.carResource.getOldCars();

        if(!carsDb) {
            throw new Error('No cars')
        }

        const cars = CarConverter.convertDbCars(carsDb);

        await this.cache.save<Car[]>(cars, CACHE_TYPE_OLD_CARS);

        return cars;
    }
}
