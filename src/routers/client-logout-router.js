import ClientLogoutController from "../controllers/client-logout-controller.js";
import AbstractRouter from "./abstract-router.js";


const clientLogoutController = new ClientLogoutController();

const routes = [
    {
        controller: clientLogoutController,
        path: '/logout',
        method: 'get'
    },
]

export default class ClientLogoutRouter extends AbstractRouter {
    constructor() {
        super(routes);
        this.createRoutes();
    }
}