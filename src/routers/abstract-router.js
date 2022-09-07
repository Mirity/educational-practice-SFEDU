import express from 'express';

export default class AbstractRouter {
    constructor() {
        this.router = express.Router();
        this.routes = [];
    }

    createRoutes() {
        this.routes.forEach((route) => {
            this.router.get(route['path'], route['controller'].execute);
        })
    }

    getRouter() {
        return this.router;
    }
}