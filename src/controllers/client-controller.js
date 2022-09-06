import ClientView from '../views/client-view.js';

export default class ClientController {
    execute(req, res, next) {
        const clientView = new ClientView();

        res.render(clientView.getTemplate(), { 'this': clientView });
    }
}