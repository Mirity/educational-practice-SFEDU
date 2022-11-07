import AbstractWebController from "./abstract-web-controller.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";
import MasterProvider from "../models/provider/master-provider.js";

export default class DeleteMasterController extends AbstractWebController implements IController {
    private masterProvider: MasterProvider;

    constructor() {
        super();

        this.masterProvider = new MasterProvider();
    }

    public  async getHandler (res: Response, req: Request): Promise<void> {
        const masterId = req.query.id;

        if(!this.isCorrectId(masterId)) {
            this.redirectToError(res, 'Неверный id');

            return;
        }

        try {
            await this.masterProvider.deleteMaster(masterId);

            res.redirect('/masters');
        } catch (err: any) {
            this.redirectToError(res, err.message);
        }
    }
}