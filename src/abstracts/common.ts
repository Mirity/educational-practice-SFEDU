import { NextFunction, Request, Response, Router } from "express";
import CarEntity from "../models/entity/car-entity";
import ServiceRecordEntity from "../models/entity/service-record-entity";
import ServiceCenterEntity from "../models/entity/service-center-entity";

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

export interface IRouter {
    createRoutes: () => void,
    getRouter: () => Router
}

type DataKey = string;
type DataForm = string;

export type DataFromForm = Record<DataKey, DataForm>;

export type ParamsForQuery = (number | string | Date)[];

export type DataForJson = CarEntity | ServiceRecordEntity | ServiceCenterEntity;
