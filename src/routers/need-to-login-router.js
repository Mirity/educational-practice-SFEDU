import NeedToLoginController from "../controllers/need-to-login-controller.js";
import AbstractRouter from "./abstract-router.js";


const needToLoginController = new NeedToLoginController();

const routes = [
    {
        controller: needToLoginController,
        path: '/need-to-login',
        method: 'get'
    },
]

export default class NeedToLoginRouter extends AbstractRouter {
    constructor() {
        super(routes);
        this.createRoutes();
    }
}