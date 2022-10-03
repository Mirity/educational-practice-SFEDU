import MyInformationController from "../controllers/my-information-controller.js";
import AbstractRouter from "./abstract-router.js";


const myInformationController = new MyInformationController();

const routes = [
    {
        controller: myInformationController,
        path: '/my-information',
        method: 'post'
    },
    {
        controller: myInformationController,
        path: '/my-information',
        method: 'get'
    },
]

export default class MyInformationRouter extends AbstractRouter {
    constructor() {
        super(routes);
        this.createRoutes();
    }
}