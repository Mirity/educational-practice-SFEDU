import ClientResource from "../models/resource/client-resource.js";
import AbstractController from "./abstract-controller.js";
//@ts-ignore
import bcrypt from 'bcrypt';
import View from "../views/view.js";
import { IController } from "../abstracts/common";

export default class ClientRegistrationController extends AbstractController implements IController {
    async getHandler (res: any, req: any): Promise<void> {
        const view = new View('registration');
        view.setCsrfToken(req.session.csrfToken);

        if(req.session.isLoggedIn) {
            this.redirectToError(res, 'Вы уже вошли в свой профиль');

            return;
        }
        this.render(res, view, req.session.isLoggedIn);
    }

    async postHandler (res: any, req: any): Promise<void> {
        const params = req.body;

        params.password = await bcrypt.hash(params.password, 10);

        const clientResource = new ClientResource();
        const client = await clientResource.getClientByEmail(params.email);

        if(client) {
            this.redirectToError(res, 'Пользователь с таким email уже существует');

            return;
        }

        await clientResource.addNewClient(params);

        res.redirect('/login');

    }
}