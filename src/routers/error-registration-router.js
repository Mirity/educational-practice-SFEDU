import ErrorRegistrationController from "../controllers/error-registration-controller.js";
import AbstractRouter from "./abstract-router.js";


const errorRegistrationController = new ErrorRegistrationController();

const routes = [
    {
        controller: errorRegistrationController,
        path: '/error-registration',
        method: 'get'
    },
]

export default class ErrorRegistrationRouter extends AbstractRouter {
    constructor() {
        super(routes);
        this.createRoutes();
    }
}