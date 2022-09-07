import ClientController from '../controllers/client-controller.js';
import AllClientsController from "../controllers/all-clients-controller.js";
import AbstractRouter from "./abstract-router.js";

const clientController = new ClientController();
const allClientsController = new AllClientsController();


export default class ClientRouter extends AbstractRouter{
    constructor() {
        super();
        super.routes = [
            {
                'controller': clientController,
                'path': '/client'
            },
            {
                'controller': allClientsController,
                'path': '/clients'
            },
        ]

        this.createRoutes()
    }
}