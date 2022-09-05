import * as path from "path";

export default class AllMastersController {
    execute(req, res, next) {
        res.sendFile(path.join(__dirname, 'views/masters', 'masters.html'));
    }
}