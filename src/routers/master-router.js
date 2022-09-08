import MasterController from '../controllers/master-controller.js';
import AllMastersController from "../controllers/all-masters-controller.js";
import AbstractRouter from "./abstract-router.js";

const masterController = new MasterController();
const mastersController = new AllMastersController();

const routes = [
    {
        controller: masterController,
        path: '/master'
    },
    {
        controller: mastersController,
        path: '/masters'
    },
]

export default class MasterRouter extends AbstractRouter{
    constructor() {
        super(routes);

        this.createRoutes()
    }
}