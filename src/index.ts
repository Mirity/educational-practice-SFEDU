import App from './App.js'
import MasterRouter from "./routers/master-router.js";
import CarRouter from "./routers/car-router.js";
import ServiceCenterRouter from "./routers/service-center-router.js";
import ServiceRecordRouter from "./routers/service-record-router.js";
import ClientRouter from "./routers/client-router.js";
import ErrorRouter from "./routers/error-router.js";
import Router404 from "./routers/404-router.js";


import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {IRouter} from "./abstracts/common";

const __filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);

const app = new App();

app.initLiquid();
app.initBodyParser();
app.initEnv();
app.initSession();

const routers: IRouter[] = [
    MasterRouter,
    CarRouter,
    ServiceCenterRouter,
    ServiceRecordRouter,
    ClientRouter,
    ErrorRouter,
    Router404
];

const routerMaster = new MasterRouter();

routers.forEach((Router) => {
    const router = new Router();

    app.initRouter(router.getRouter());
})

app.listen(3020);
