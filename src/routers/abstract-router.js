import express from 'express';

export default class AbstractRouter {
    constructor(routes) {
        this.router = express.Router();
        this.routes = routes;
    }

    createRoutes() {
        this.routes.forEach(({path, controller}) => {
            this.router.get(path, controller.execute);
        })
    }

    getRouter() {
        return this.router;
    }
}