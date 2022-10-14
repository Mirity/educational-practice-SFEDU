//@ts-ignore
import express from 'express';
//@ts-ignore
import { Liquid } from 'liquidjs';
//@ts-ignore
import bodyParser from "body-parser";
import path from 'path';
//@ts-ignore
import * as dotenv from "dotenv";
//@ts-ignore
import session from 'express-session';


export default class App {
    app: any;
    constructor() {
        this.app = express();
        this.app.use('/css', express.static(__dirname + '/css'));
    }

    public listen(port: number): void {
        this.app.listen(port);
    }

    public initRouter(router: any): void {
        this.app.use(router);
    }

    public initEnv(): void {
        dotenv.config()
    }

    public initBodyParser(): void {
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
    }

    public initLiquid(): void {
        const engine = new Liquid();
        this.app.engine('liquid', engine.express());
        this.app.set('views', path.resolve(__dirname, 'templates'));
        this.app.set('view engine', 'liquid');
    }

    public initSession(): void {
        this.app.use(session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 60000,
            },
        }))

    }
}