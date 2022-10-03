import MyRecordsController from "../controllers/my-records-controller.js";
import AbstractRouter from "./abstract-router.js";


const myRecordsController = new MyRecordsController();

const routes = [
    {
        controller: myRecordsController,
        path: '/my-records',
        method: 'get'
    },
]

export default class MyRecordsRouter extends AbstractRouter {
    constructor() {
        super(routes);
        this.createRoutes();
    }
}