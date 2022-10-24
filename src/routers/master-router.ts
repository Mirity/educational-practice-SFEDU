import MasterController from '../controllers/master-controller.js';
import AllMastersController from "../controllers/all-masters-controller.js";
import AbstractRouter from "./abstract-router.js";
import DeleteMasterController from "../controllers/delete-master-controller.js";
import {IRouter, Route} from "../abstracts/common";
import { RequestMethod } from "../abstracts/common.js";


const masterController = new MasterController();
const mastersController = new AllMastersController();
const deleteMasterController = new DeleteMasterController()

const routes: Route[] = [
    {
        controller: masterController,
        path: '/master',
        method: RequestMethod.post
    },
    {
        controller: masterController,
        path: '/master',
        method: RequestMethod.get
    },
    {
        controller: mastersController,
        path: '/masters',
        method: RequestMethod.get
    },

    {
        controller: deleteMasterController,
        path: '/delete-master',
        method: RequestMethod.get
    },
]

export default class MasterRouter extends AbstractRouter implements IRouter {
    constructor() {
        super(routes);

        this.createRoutes();
    }
}