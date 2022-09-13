import MasterController from '../controllers/master-controller.js';
import AllMastersController from "../controllers/all-masters-controller.js";
import AbstractRouter from "./abstract-router.js";

const masterController = new MasterController();
const mastersController = new AllMastersController();

const routes = [
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
]

export default class MasterRouter extends AbstractRouter {
    constructor() {
        super(routes);
        this.isPost = true;

        this.createRoutes(this.isPost);
    }
}