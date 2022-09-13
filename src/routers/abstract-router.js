import express from 'express';

export default class AbstractRouter {
    constructor(routes) {
        this.router = express.Router();
        this.routes = routes;
    }

    createRoutes(isPost) {
        this.routes.forEach(({ path, controller }) => {
            this.router.get(path, controller.execute.bind(controller));
            if(isPost) {
                this.router.post(path, controller.execute.bind(controller));
            }
        })
    }

    getRouter() {
        return this.router;
    }
}