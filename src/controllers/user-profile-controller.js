import UserProfileView from "../views/user-profile-view.js";
import AbstractController from "./abstract-controller.js";

export default class UserProfileController extends AbstractController {
    async getHandler(res, req) {
        const userProfileView = new UserProfileView();

        if(req.session.isLoggedIn) {
            res.render(userProfileView.getTemplate(), {
                'this': userProfileView,
                isLoggedIn: req.session.isLoggedIn
            });
        } else {
            res.redirect('/need-to-login')
        }
    }

    async postHandler(res, req) {
        req.session.destroy();

        res.redirect('/cars')
    }
}