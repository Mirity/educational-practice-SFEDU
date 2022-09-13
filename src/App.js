import express from 'express';
import { Liquid } from 'liquidjs';
import bodyParser from "body-parser";
import path from 'path';

export default class App {
    constructor() {
        this.app = express();
        this.app.use('/css', express.static(__dirname + '/css'));
    }

    listen(port) {
        this.app.listen(port);
    }

    initRouter (router) {
        this.app.use(router);
    }

    initBodyParser() {
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
    }

    initLiquid() {
        const engine = new Liquid();
        this.app.engine('liquid', engine.express());
        this.app.set('views', path.resolve(__dirname, 'templates'));
        this.app.set('view engine', 'liquid');
    }
}