import MasterController from '../controllers/master-controller.js';
import AllMastersController from "../controllers/all-masters-controller.js";
import AbstractRouter from "./abstract-router.js";
import DeleteMasterController from "../controllers/delete-master-controller.js";
import { Route } from "../abstracts/common";

const masterController = new MasterController();
const mastersController = new AllMastersController();
const deleteMasterController = new DeleteMasterController()

const routes: Route[] = [
    {
        controller: masterController,
        path: '/master',
        method: 'post'
    },
    {
        controller: masterController,
        path: '/master',
        method: 'get'
    },
    {
        controller: mastersController,
        path: '/masters',
        method: 'get'
    },

    {
        controller: deleteMasterController,
        path: '/delete-master',
        method: 'get'
    },
]

export default class MasterRouter extends AbstractRouter {
    constructor() {
        super(routes);

        this.createRoutes();
    }
}