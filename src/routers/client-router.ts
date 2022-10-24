import ClientLoginController from "../controllers/client-login-controller.js";
import AbstractRouter from "./abstract-router.js";
import ClientLogoutController from "../controllers/client-logout-controller.js";
import ClientRegistrationController from "../controllers/client-registration-controller.js";
import ClientCarsController from "../controllers/client-cars-controller.js";
import ClientInformationController from "../controllers/client-information-controller.js";
import ClientMenuController from "../controllers/client-menu-controller.js";
import ClientRecordsController from "../controllers/client-records-controller.js";
import { IRouter, Route } from "../abstracts/common";
import { RequestMethod } from "../abstracts/common.js";



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
        method: RequestMethod.post
    },
    {
        controller: clientLoginController,
        path: '/login',
        method: RequestMethod.get
    },
    {
        controller: clientLogoutController,
        path: '/logout',
        method: RequestMethod.get
    },
    {
        controller: clientRegistrationController,
        path: '/registration',
        method: RequestMethod.post
    },
    {
        controller: clientRegistrationController,
        path: '/registration',
        method: RequestMethod.get
    },
    {
        controller: clientCarsController,
        path: '/my-cars',
        method: RequestMethod.get
    },
    {
        controller: clientInformationController,
        path: '/my-information',
        method: RequestMethod.post
    },
    {
        controller: clientInformationController,
        path: '/my-information',
        method: RequestMethod.get
    },
    {
        controller: clientMenuController,
        path: '/user-profile',
        method: RequestMethod.get
    },
    {
        controller: clientRecordsController,
        path: '/my-records',
        method: RequestMethod.get
    },
]

export default class ClientRouter extends AbstractRouter implements IRouter {
    constructor() {
        super(routes);
        this.createRoutes();
    }
}