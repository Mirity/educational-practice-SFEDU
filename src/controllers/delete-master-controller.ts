import AbstractWebController from "./abstract-web-controller.js";
import MasterResource from "../models/resource/master-resource.js";
import { IController } from "../abstracts/common";
import {Request, Response} from "express";

export default class DeleteMasterController extends AbstractWebController implements IController {
    public  async getHandler (res: Response, req: Request): Promise<void> {
        const masterResource = new MasterResource();
        const masterId = req.query.id;

        if(!this.isCorrectId(masterId)) {
            this.redirectToError(res, 'Неверный id');

            return;
        }

        await masterResource.deleteMaster(masterId);

        res.redirect('/masters');
    }
}