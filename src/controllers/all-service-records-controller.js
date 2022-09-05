import * as path from "path";

export default class AllServiceRecordsController {
    execute(req, res, next) {
        res.sendFile(path.join(__dirname, 'views/service-records', 'service-records.html'));
    }
}