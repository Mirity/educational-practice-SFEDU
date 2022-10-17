import { Client } from "./client";
import { DbCar} from "./car";
import { DbMaster } from "./master";
import { DbServiceRecord } from "./service-record";
import { DbServiceCenter } from "./service-center";

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

