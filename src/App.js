import express from 'express';
import { Liquid } from 'liquidjs';
import path from 'path';

export default class App {
    constructor() {
        this.app = express();
        this.app.use('/css', express.static(__dirname + '/css'));

        const engine = new Liquid();
        this.app.engine('liquid', engine.express());
        this.app.set('views', path.resolve(__dirname, 'templates'));            // specify the views directory
        this.app.set('view engine', 'liquid');
    }

    listen(port) {
        this.app.listen(port);
    }

    initRouter (router) {
        this.app.use(router);
    }
}