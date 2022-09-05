import * as path from "path";

export default class MasterController {
    execute(req, res, next) {
        res.sendFile(path.join(__dirname, 'views/master', 'master.html'));
    }
}