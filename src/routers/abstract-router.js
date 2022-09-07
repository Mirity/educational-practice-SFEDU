import express from 'express';

export default class AbstractRouter {
    constructor(routes) {
        this.router = express.Router();
        this.routes = [];
    }

    createRoutes() {
        this.routes.forEach((route) => {
            const {path, controller} = route;
            this.router.get(path, controller.execute);
        })
    }

    getRouter() {
        return this.router;
    }
}