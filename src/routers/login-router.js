import LoginController from "../controllers/login-controller.js";
import AbstractRouter from "./abstract-router.js";


const loginController = new LoginController();

const routes = [
    {
        controller: loginController,
        path: '/login',
        method: 'post'
    },
    {
        controller: loginController,
        path: '/login',
        method: 'get'
    },
]

export default class LoginRouter extends AbstractRouter {
    constructor() {
        super(routes);
        this.createRoutes();
    }
}