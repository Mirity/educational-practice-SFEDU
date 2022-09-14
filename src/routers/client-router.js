import ClientController from '../controllers/client-controller.js';
import AllClientsController from "../controllers/all-clients-controller.js";
import AbstractRouter from "./abstract-router.js";
import EditClientController from "../controllers/edit-client-controller.js";

const clientController = new ClientController();
const allClientsController = new AllClientsController();
const editClientController = new EditClientController();

const routes = [
    {
        controller: clientController,
        path: '/client',
        method: 'post'
    },
    {
        controller: clientController,
        path: '/client',
        method: 'get'
    },
    {
        controller: allClientsController,
        path: '/clients',
        method: 'get'
    },
    {
        controller: editClientController,
        path: '/edit-client',
        method: 'get'
    },
    {
        controller: editClientController,
        path: '/edit-client',
        method: 'post'
    },
]

export default class ClientRouter extends AbstractRouter {
    constructor() {
        super(routes);

        this.createRoutes();
    }
}