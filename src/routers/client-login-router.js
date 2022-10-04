import ClientLoginController from "../controllers/client-login-controller.js";
import AbstractRouter from "./abstract-router.js";


const clientLoginController = new ClientLoginController();

const routes = [
    {
        controller: clientLoginController,
        path: '/login',
        method: 'post'
    },
    {
        controller: clientLoginController,
        path: '/login',
        method: 'get'
    },
]

export default class ClientLoginRouter extends AbstractRouter {
    constructor() {
        super(routes);
        this.createRoutes();
    }
}