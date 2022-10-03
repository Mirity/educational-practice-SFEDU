import LoginView from "../views/login-view.js";
import LoginResource from "../models/resource/login-resource.js";
import AbstractController from "./abstract-controller.js";
import bcrypt from "bcrypt";

export default class LoginController extends AbstractController {
    async getHandler(res, req) {
        const loginView = new LoginView();

        if(req.session.isLoggedIn) {
            res.redirect('/already-login')
        } else {
            res.render(loginView.getTemplate(), {
                'this': loginView,
                isLoggedIn: req.session.isLoggedIn
            });
        }
    }

    async postHandler(res, req) {
        const loginResource = new LoginResource();
        const params = req.body;

        const client = await loginResource.getClientByEmail(params.email);
        let isCorrectPassword = false;

        if(client) {
             isCorrectPassword = await bcrypt.compare(params.password, client.password)
        } else {
            res.redirect('/error-login');
            return;
        }

        if (isCorrectPassword) {
            req.session.isLoggedIn = true;
            req.session.userId = await loginResource.getClientIdByEmail(params.email);
            console.log(req.session.userId)

            res.redirect('/user-profile');
        } else {
            res.redirect('/error-login');
        }
    }
}