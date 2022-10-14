import { ClientFromForm } from "./client";
import { CarFromForm } from "./car";
import { MasterFromForm } from "./master";
import { ServiceRecordFromForm } from "./service-record";
import { ServiceCenterFromForm } from "./service-center";

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

export type DataFromForm =  ClientFromForm | CarFromForm | MasterFromForm | ServiceRecordFromForm |ServiceCenterFromForm;

