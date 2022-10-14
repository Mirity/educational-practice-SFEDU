import ErrorController from "../controllers/error-controller.js";
import AbstractRouter from "./abstract-router.js";
import {IRouter, Route} from "../abstracts/common";


const errorController = new ErrorController();

const routes: Route[] = [
    {
        controller: errorController,
        path: '/error',
        method: 'get'
    },
]

export default class ErrorRouter extends AbstractRouter implements IRouter {
    constructor() {
        super(routes);
        this.createRoutes();
    }
}