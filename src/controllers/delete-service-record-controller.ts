import ServiceRecordResource from "../models/resource/service-record-resource.js";
import AbstractController from "./abstract-controller.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";

export default class DeleteServiceRecordController extends AbstractController implements IController {
    public async getHandler (res: Response, req: Request): Promise<void> {
        const serviceRecordResource = new ServiceRecordResource();

        const serviceRecordId = req.query.id;

        if(!this.isCorrectId(serviceRecordId)) {
            this.redirectToError(res, 'Неверный id');

            return;
        }

        await serviceRecordResource.deleteServiceRecord(serviceRecordId);

        res.redirect('/service-records');
    }
}