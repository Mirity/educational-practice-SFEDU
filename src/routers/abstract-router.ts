import express, { Router } from 'express';
import { IRouter, Route } from "../abstracts/common";
import { RequestMethod } from "../abstracts/common.js";

export default abstract class AbstractRouter implements IRouter {
    routes: Route[];
    router: Router;
    
    constructor(routes: Route[]) {
        this.router = express.Router();
        this.routes = routes;
    }

    public createRoutes(): void {
        this.routes.forEach(({ path, controller, method }) => {
            if (method === RequestMethod.post) {
                this.router.post(path, controller.execute.bind(controller));
            } else if (method === RequestMethod.get) {
                this.router.get(path, controller.execute.bind(controller));
            }
        })
    }

    public getRouter(): Router {
        return this.router;
    }
}