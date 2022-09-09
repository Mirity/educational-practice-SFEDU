import ClientsView from '../views/clients-view.js';
import Database from '../database.js';

export default class ClientsController {
   async execute(req, res, next) {
       const connection = Database.getConnection();
       if (req.method === 'GET') {
           const clients = await connection.awaitQuery(`select * from client`);

           const clientsView = new ClientsView();
           clientsView.setClients(clients)

           res.render(clientsView.getTemplate(), { 'this': clientsView });
       } else {
           await connection.awaitQuery(
               `INSERT INTO client (name, surname, passport, password) VALUES (?, ?, ?, ?)`,
               [req.body.name, req.body.surname, req.body.passport, req.body.password]);
           res.redirect('/clients');
       }
    }
}