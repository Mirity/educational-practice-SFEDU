import AbstractRouter from "./abstract-router.js";
import { IRouter, Route } from "../abstracts/common";
import Controller404 from "../controllers/404-controller.js";
import { RequestMethod } from "../abstracts/common.js"


const controller404 = new Controller404();

const routes: Route[] = [
    {
        controller: controller404,
        path: '/404',
        method: RequestMethod.get
    },
]

export default class Router404 extends AbstractRouter implements IRouter {
    constructor() {
        super(routes);
        this.createRoutes();
    }
}