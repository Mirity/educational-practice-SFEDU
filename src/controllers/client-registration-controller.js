import ClientResource from "../models/resource/client-resource.js";
import AbstractController from "./abstract-controller.js";
import bcrypt from 'bcrypt';
import View from "../views/view.js";
import * as url from "url";

export default class ClientRegistrationController extends AbstractController {
    async getHandler (res, req) {
        const view = new View();
        view.setTemplate('registration');

        if(req.session.isLoggedIn) {
            res.redirect(url.format({
                pathname:"/error",
                query: {
                    "textError": "Вы уже вошли в свой профиль"
                }
            }));
            return;
        }
        this.render(res, view, req.session.isLoggedIn);
    }

    async postHandler (res, req) {
        const params = req.body;
        params.password = await bcrypt.hash(params.password, 10);

        const clientResource = new ClientResource();
        const clientId = await clientResource.getClientIdByEmail(params);

        if(clientId) {
            res.redirect(url.format({
                pathname:"/error",
                query: {
                    "textError": "Пользователь с таким email уже существует"
                }
            }));

            return;
        }

        await clientResource.addNewClient(params);

        res.redirect('/login');

    }
}