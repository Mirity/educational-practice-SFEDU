import { NextFunction, Request, Response, Router } from "express";

export enum RequestMethod {
    get = 'get',
    post = 'post'
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