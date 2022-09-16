import ServiceRecordResource from "../models/resource/service-record-resource.js";
import AbstractController from "./abstract-controller.js";

export default class DeleteServiceRecordController extends AbstractController {
    async getHandler (res, req) {
        const serviceRecordResource = new ServiceRecordResource();
        await serviceRecordResource.deleteServiceRecord(req.query.id);

        res.redirect('/service-records');
    }
}