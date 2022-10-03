import RegistrationController from "../controllers/registration-controller.js";
import AbstractRouter from "./abstract-router.js";


const registrationController = new RegistrationController();

const routes = [
    {
        controller: registrationController,
        path: '/registration',
        method: 'post'
    },
    {
        controller: registrationController,
        path: '/registration',
        method: 'get'
    },
]

export default class RegistrationRouter extends AbstractRouter {
    constructor() {
        super(routes);
        this.createRoutes();
    }
}