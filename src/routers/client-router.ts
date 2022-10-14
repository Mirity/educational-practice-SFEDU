import ClientLoginController from "../controllers/client-login-controller.js";
import AbstractRouter from "./abstract-router.js";
import ClientLogoutController from "../controllers/client-logout-controller.js";
import ClientRegistrationController from "../controllers/client-registration-controller.js";
import ClientCarsController from "../controllers/client-cars-controller.js";
import ClientInformationController from "../controllers/client-information-controller.js";
import ClientMenuController from "../controllers/client-menu-controller.js";
import ClientRecordsController from "../controllers/client-records-controller.js";
import {IRouter, Route} from "../abstracts/common";


const clientRecordsController = new ClientRecordsController();
const clientMenuController = new ClientMenuController();
const clientInformationController = new ClientInformationController();
const clientCarsController = new ClientCarsController();
const clientRegistrationController = new ClientRegistrationController();
const clientLogoutController = new ClientLogoutController();
const clientLoginController = new ClientLoginController();

const routes: Route[] = [
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
    {
        controller: clientLogoutController,
        path: '/logout',
        method: 'get'
    },
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
    {
        controller: clientCarsController,
        path: '/my-cars',
        method: 'get'
    },
    {
        controller: clientInformationController,
        path: '/my-information',
        method: 'post'
    },
    {
        controller: clientInformationController,
        path: '/my-information',
        method: 'get'
    },
    {
        controller: clientMenuController,
        path: '/user-profile',
        method: 'get'
    },
    {
        controller: clientRecordsController,
        path: '/my-records',
        method: 'get'
    },
]

export default class ClientRouter extends AbstractRouter implements IRouter {
    constructor() {
        super(routes);
        this.createRoutes();
    }
}