import {Client, ClientFromForm} from "./client";
import { CarFromForm, DbCar} from "./car";
import {DbMaster, MasterFromForm} from "./master";
import {DbServiceRecord, ServiceRecordFromForm} from "./service-record";
import {DbServiceCenter, ServiceCenterFromForm} from "./service-center";

export enum RequestMethod {
    get = 'get',
    post = 'post'
}

export interface EntityMap {
    [key:string]: string,
}

export interface Route {
    controller: IController,
    path: string,
    method: string
}

export interface IController {
    execute: (req: any, res: any, next: any) => void
}

export interface IView {
    getTemplate: () => string,
    setTemplate: (template: string) => void,
    getCsrfToken: () => string | null,
    setCsrfToken: (csrfToken: string | null) => void
}

export interface IRouter {
    createRoutes: () => void,
    getRouter: () => any
}

export interface DataFromForm {
    [key: string]: string;
}

export type DataDb = DbServiceRecord | DbServiceCenter | DbMaster | DbCar | Client;

