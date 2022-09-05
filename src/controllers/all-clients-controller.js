import * as path from "path";

export default class AllClientsController {
    execute(req, res, next) {
        res.sendFile(path.join(__dirname, 'views/clients', 'clients.html'));
    }
}