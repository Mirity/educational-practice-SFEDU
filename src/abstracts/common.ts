import { NextFunction, Request, Response, Router } from "express";
import RuntimeCache from "../cache-handlers/runtime-cache.js";
import FileCache from "../cache-handlers/file-cache.js";
import RedisCache from "../cache-handlers/redis-cache.js";
import { Car } from "./car";
import { ServiceCenter } from "./service-center";
import { ServiceRecord } from "./service-record";

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
    save: <T>(data: T, dataType: string, key?: number) => Promise<void>,
    get: <T>(dataType: string, key?: number) => Promise<T | null>,
    delete: (dataType: string, key?: number) => Promise<void>,
    update: <T>(data: T, dataType: string, key: number) => Promise<void>
}

export enum CacheType  {
    runtime = 'runtime',
    file = 'file',
    redis = 'redis',
}


export interface IRouter {
    createRoutes: () => void,
    getRouter: () => Router
}

type DataKey = string;
type DataForm = string;

export type DataFromForm = Record<DataKey, DataForm>;

export type ParamsForQuery = (number | string | Date)[];

export interface IRuntimeCache {
    [key: string]: any;
}