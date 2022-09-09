import express from 'express';
import bodyParser from "body-parser";

export default class AbstractRouter {
    constructor(routes) {
        this.router = express.Router();
        this.routes = routes;
        this.initBodyParser();
    }

    initBodyParser() {
        this.jsonParser = bodyParser.json();
        this.urlencodedParser = bodyParser.urlencoded({ extended: false });
    }

    createRoutes() {
        this.routes.forEach(({ path, controller }) => {
            this.router.get(path, controller.execute);
        })
    }

    createPostQuery() {
        this.routes.forEach(({ path, controller }) => {
            this.router.post(path, this.urlencodedParser, controller.execute);
        })
    }

    getRouter() {
        return this.router;
    }
}