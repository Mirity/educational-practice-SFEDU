import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export default class App {
    constructor(port) {
        this.app = express();
        this.app.use('/css', express.static(__dirname + '/css'));
        this.app.listen(port);
    }

    getPage(path, execute) {
        this.app.get(path, execute);
    }

    routes (router) {
        this.app.use(router);
    }
}