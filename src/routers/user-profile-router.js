import UserProfileController from "../controllers/user-profile-controller.js";
import AbstractRouter from "./abstract-router.js";


const userProfileController = new UserProfileController();

const routes = [
    {
        controller: userProfileController,
        path: '/user-profile',
        method: 'get'
    },
    {
        controller: userProfileController,
        path: '/user-profile',
        method: 'post'
    },
]

export default class UserProfileRouter extends AbstractRouter {
    constructor() {
        super(routes);
        this.createRoutes();
    }
}