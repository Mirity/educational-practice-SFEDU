import AbstractController from "./abstract-controller.js";
import View from "../views/view.js";
import url from "url";

export default class UserProfileController extends AbstractController {
    async getHandler(res, req) {
        const view = new View();
        view.setTemplate('user-profile');

        if(!req.session.isLoggedIn) {
            res.redirect(url.format({
                pathname:"/error",
                query: {
                    "textError": "Войдите, чтобы продолжить"
                }
            }));

            return;
        }
        
        this.render(res, view, req.session.isLoggedIn)
    }

    async postHandler(res, req) {
        req.session.destroy();

        res.redirect('/cars')
    }
}