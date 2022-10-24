import ErrorController from "../controllers/error-controller.js";
import AbstractRouter from "./abstract-router.js";
import {IRouter, Route} from "../abstracts/common";
import { RequestMethod } from "../abstracts/common.js";



const errorController = new ErrorController();

const routes: Route[] = [
    {
        controller: errorController,
        path: '/error',
        method: RequestMethod.get
    },
]

export default class ErrorRouter extends AbstractRouter implements IRouter {
    constructor() {
        super(routes);
        this.createRoutes();
    }
}