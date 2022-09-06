import ClientsView from '../views/clients-view.js';

export default class ClientsController {
    execute(req, res, next) {
        const clientsView = new ClientsView();

        res.render(clientsView.getTemplate(), { 'this': clientsView });
    }
}