import * as path from "path";

export default class ServiceRecordController {
    execute(req, res, next) {
        res.sendFile(path.join(__dirname, 'views/service-record', 'service-record.html'));
    }
}