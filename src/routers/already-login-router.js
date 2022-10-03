import AlreadyLoginController from "../controllers/already-login-controller.js";
import AbstractRouter from "./abstract-router.js";


const alreadyLoginController = new AlreadyLoginController();

const routes = [
    {
        controller: alreadyLoginController,
        path: '/already-login',
        method: 'get'
    },
]

export default class AlreadyLoginRouter extends AbstractRouter {
    constructor() {
        super(routes);
        this.createRoutes();
    }
}