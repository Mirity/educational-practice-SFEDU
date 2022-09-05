import express from 'express';
import ClientController from '../controllers/client-controller.js';
import AllClientsController from "../controllers/all-clients-controller.js";

const clientController = new ClientController();
const allClientsController = new AllClientsController();


export default class ClientRouter {
    constructor() {
        this.router = express.Router();
    }

    createRouters() {
        this.router.get(`/client`, clientController.execute);
        this.router.get(`/clients`, allClientsController.execute);

        return this.router;
    }
}