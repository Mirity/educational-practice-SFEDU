import ServiceRecordResource from "../models/resource/service-record-resource.js";
import AbstractController from "./abstract-controller.js";
import { IController } from "../abstracts/common";

export default class DeleteServiceRecordController extends AbstractController implements IController {
    public async getHandler (res: any, req: any): Promise<void> {
        const serviceRecordResource = new ServiceRecordResource();
        await serviceRecordResource.deleteServiceRecord(req.query.id);

        res.redirect('/service-records');
    }
}