import * as path from "path";

export default class ClientController {
    execute(req, res, next) {
        res.sendFile(path.join(__dirname, 'views/client', 'client.html'));
    }

    routeClientByName (req, res, next) {
        res.send(`Client by name`);
    }

    routeClientByPassport (req, res, next) {
        res.send(`Client by passport`);
    }
}