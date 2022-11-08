import App from './App.js'
import MasterRouter from "./routers/master-router.js";
import CarRouter from "./routers/car-router.js";
import ServiceCenterRouter from "./routers/service-center-router.js";
import ServiceRecordRouter from "./routers/service-record-router.js";
import ClientRouter from "./routers/client-router.js";
import ErrorRouter from "./routers/error-router.js";
import Router404 from "./routers/404-router.js";
import CarApiRouter from "./routers/api-routers/car-api-router.js";
import ServiceRecordApiRouter from "./routers/api-routers/service-record-api-router.js";
import { IRouter } from "./abstracts/common";
import ServiceCenterApiRouter from "./routers/api-routers/service-center-api-router.js";


import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);

const app = new App();

app.initLiquid();
app.initBodyParser();
app.initSession();

const routers: IRouter[] = [
    new MasterRouter,
    new CarRouter,
    new ServiceCenterRouter,
    new ServiceRecordRouter,
    new ClientRouter,
    new ErrorRouter,
    new Router404,
    new CarApiRouter,
    new ServiceRecordApiRouter,
    new ServiceCenterApiRouter
];

routers.forEach((router) => {
    app.initRouter(router.getRouter());
})

app.listen(3020);
