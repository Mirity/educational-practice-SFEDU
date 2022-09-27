import App from './App.js'
import ClientRouter from "./routers/client-router.js";
import MasterRouter from "./routers/master-router.js";
import CarRouter from "./routers/car-router.js";
import ServiceCenterRouter from "./routers/service-center-router.js";
import ServiceRecordRouter from "./routers/service-record-router.js";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);

const app = new App();

app.initLiquid();
app.initBodyParser();
app.initEnv();

const routers = [
    ClientRouter,
    MasterRouter,
    CarRouter,
    ServiceCenterRouter,
    ServiceRecordRouter,
];

routers.forEach((Router) => {
    const router = new Router();

    app.initRouter(router.getRouter());
})

app.listen(3020);
