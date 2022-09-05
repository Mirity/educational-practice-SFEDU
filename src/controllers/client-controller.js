import * as path from "path";

export default class ClientController {
    execute(req, res, next) {
        res.sendFile(path.join(__dirname, 'views/client', 'client.html'));
    }
}