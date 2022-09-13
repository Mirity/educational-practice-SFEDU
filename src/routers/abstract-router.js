import express from 'express';

export default class AbstractRouter {
    constructor(routes) {
        this.router = express.Router();
        this.routes = routes;
    }

    createRoutes() {
        this.routes.forEach(({ path, controller, method }) => {
            if (method === 'post') {
                this.router.post(path, controller.execute.bind(controller));
            } else if (method === 'get') {
                this.router.get(path, controller.execute.bind(controller));
            }
        })
    }

    getRouter() {
        return this.router;
    }
}