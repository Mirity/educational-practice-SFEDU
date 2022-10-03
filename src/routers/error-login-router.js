import ErrorLoginController from "../controllers/error-login-controller.js";
import AbstractRouter from "./abstract-router.js";


const errorLoginController = new ErrorLoginController();

const routes = [
    {
        controller: errorLoginController,
        path: '/error-login',
        method: 'get'
    },
]

export default class ErrorLoginRouter extends AbstractRouter {
    constructor() {
        super(routes);
        this.createRoutes();
    }
}