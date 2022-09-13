import express from 'express';
import bodyParser from "body-parser";

export default class AbstractRouter {
    constructor(routes) {
        this.router = express.Router();
        this.routes = routes;
    }

    createRoutes() {
        this.routes.forEach(({ path, controller }) => {
            this.router.post(path, urlencodedParser, controller.execute.bind(controller));
            this.router.get(path, controller.execute.bind(controller));
        })
    }

    getRouter() {
        return this.router;
    }
}