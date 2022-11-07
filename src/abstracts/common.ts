import e, { NextFunction, Request, Response, Router } from "express";
import RuntimeCache from "../cache-handlers/runtime-cache.js";
import FileCache from "../cache-handlers/file-cache.js";
import RedisCache from "../cache-handlers/redis-cache.js";
import {Car} from "./car";
import {ServiceCenter} from "./service-center";
import {ServiceRecord} from "./service-record";

export enum RequestMethod {
    get = 'get',
    post = 'post',
    put = 'put',
    delete = 'delete'
}

export type EntityMap = Record<string, string>;

export interface Route {
    controller: IController,
    path: string,
    method: string
}

export interface IController {
    execute: (req: Request, res: Response, next: NextFunction) => void
}

export interface IView {
    getTemplate: () => string,
    setTemplate: (template: string) => void,
    getCsrfToken: () => string | null | undefined,
    setCsrfToken: (csrfToken: string | null | undefined) => void
}

export interface ICache {
    saveCache: <T extends DataTypes>(data: T, dataType: keyof CacheRuntimeTypeData, key?: number) => Promise<void>,
    getCache: (dataType: keyof CacheRuntimeTypeData, key?: number) => Promise<string | null>,
    deleteCache: (dataType: keyof CacheRuntimeTypeData, key?: number) => Promise<void>,
    updateCache: <T extends DataTypes>(data: T, dataType: keyof CacheRuntimeTypeData, key: number) => Promise<void>
}

export const CacheType = {
    runtime: RuntimeCache,
    file: FileCache,
    redis: RedisCache
}


export interface IRouter {
    createRoutes: () => void,
    getRouter: () => Router
}

type DataKey = string;
type DataForm = string;

export type DataFromForm = Record<DataKey, DataForm>;

export type ParamsForQuery = (number | string | Date)[];

export type DataTypes = Car | Car[] | ServiceCenter | ServiceCenter[] | ServiceRecord |  ServiceRecord[];

export type CacheRuntimeTypeData = {
    car: Record<number, Car | undefined>,
    cars: Record<number, Car[] | undefined>,
    serviceCenter: Record<number, ServiceCenter | undefined>,
    serviceCenters: Record<number, ServiceCenter[] | undefined>,
    serviceRecord: Record<number, ServiceRecord | undefined>,
    serviceRecords: Record<number, ServiceRecord[] | undefined>,
    clientCars: Record<number, Car[] | undefined>,
    clientRecords: Record<number, ServiceRecord[] | undefined>,
    oldCars: Record<number, Car[] | undefined>
}