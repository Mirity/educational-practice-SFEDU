import ClientRegistrationController from "../controllers/client-registration-controller.js";
import AbstractRouter from "./abstract-router.js";


const clientRegistrationController = new ClientRegistrationController();

const routes = [
    {
        controller: clientRegistrationController,
        path: '/registration',
        method: 'post'
    },
    {
        controller: clientRegistrationController,
        path: '/registration',
        method: 'get'
    },
]

export default class ClientRegistrationRouter extends AbstractRouter {
    constructor() {
        super(routes);
        this.createRoutes();
    }
}