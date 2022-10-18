import express, { Router } from 'express';
import { IRouter, Route } from "../abstracts/common";

export default abstract class AbstractRouter implements IRouter {
    routes: Route[];
    router: Router;
    
    constructor(routes: Route[]) {
        this.router = express.Router();
        this.routes = routes;
    }

    public createRoutes(): void {
        this.routes.forEach(({ path, controller, method }) => {
            if (method === 'post') {
                this.router.post(path, controller.execute.bind(controller));
            } else if (method === 'get') {
                this.router.get(path, controller.execute.bind(controller));
            }
        })
    }

    public getRouter(): Router {
        return this.router;
    }
}