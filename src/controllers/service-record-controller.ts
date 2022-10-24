import ServiceRecordView from '../views/service-record-view.js';
import ServiceRecordResource from "../models/resource/service-record-resource.js";
import AbstractWebController from "./abstract-web-controller.js";
import ServiceRecordConverter from "../converters/service-record-converter.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";

export default class ServiceRecordController extends AbstractWebController implements IController {
    public async getHandler (res: Response, req: Request): Promise<void> {
        const serviceRecordResource = new ServiceRecordResource();
        const id = req.query.id;

        if (!this.isCorrectId(id)) {
            return this.handleInvalidId(res);
        }

        const serviceRecordDb = await serviceRecordResource.getServiceRecordById(id);

        if(!this.isCorrectData(serviceRecordDb)) {
            res.redirect('/404')

            return;
        }

        const serviceRecordView = new ServiceRecordView();
        serviceRecordView.setServiceRecord(ServiceRecordConverter.convertDbServiceRecord(serviceRecordDb));

        this.render(res, serviceRecordView, req.session.isLoggedIn)
    }

    public async postHandler (res: Response, req: Request): Promise<void> {
        let params = req.body;


        const serviceRecordResource = new ServiceRecordResource();

        try {
            await serviceRecordResource.addNewServiceRecord(params);
        } catch (err) {
            this.redirectToError(res, 'Неверно введены данные', 400);

            return;
        }

        res.redirect('/service-records')
    }
}