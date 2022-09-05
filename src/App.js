import express from 'express';

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
}