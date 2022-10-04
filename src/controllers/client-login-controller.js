import View from "../views/view.js";
import ClientResource from "../models/resource/client-resource.js";
import AbstractController from "./abstract-controller.js";
import bcrypt from "bcrypt";
import url from "url";

export default class ClientLoginController extends AbstractController {
    async getHandler(res, req) {
        const view = new View();
        view.setTemplate('login');

        if (req.session.isLoggedIn) {
            res.redirect(url.format({
                pathname: "/error",
                query: {
                    "textError": "Вы уже вошли в свой профиль"
                }
            }));
            return;
        }
        this.render(res, view, req.session.isLoggedIn);
    }

    async postHandler(res, req) {
        const clientResource = new ClientResource();
        const params = req.body;

        const client = await clientResource.getClientIdPasswordByEmail(params.email);
        let isCorrectPassword = false;

        if (!client) {
            res.redirect(url.format({
                pathname: "/error",
                query: {
                    "textError": "Неправильный пароль или email"
                }
            }));

            return;
        }

        isCorrectPassword = await bcrypt.compare(params.password, client.password)

        if (!isCorrectPassword) {
            res.redirect(url.format({
                pathname: "/error",
                query: {
                    "textError": "Неправильный пароль или email"
                }
            }));

            return;
        }

        req.session.isLoggedIn = true;
        req.session.userId = client.id;

        res.redirect('/user-profile');
    }
}