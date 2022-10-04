import App from './App.js'
import MasterRouter from "./routers/master-router.js";
import CarRouter from "./routers/car-router.js";
import ServiceCenterRouter from "./routers/service-center-router.js";
import ServiceRecordRouter from "./routers/service-record-router.js";
import ClientLoginRouter from "./routers/client-login-router.js";
import ClientRegistrationRouter from "./routers/client-registration-router.js";
import ErrorRouter from "./routers/error-router.js";
import UserProfileRouter from "./routers/user-profile-router.js";
import MyInformationRouter from "./routers/my-information-router.js";
import MyCarsRouter from "./routers/my-cars-router.js";
import MyRecordsRouter from "./routers/my-records-router.js";
import ClientLogoutRouter from "./routers/client-logout-router.js";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);

const app = new App();

app.initLiquid();
app.initBodyParser();
app.initEnv();
app.initSession();

const routers = [
    MasterRouter,
    CarRouter,
    ServiceCenterRouter,
    ServiceRecordRouter,
    ClientLoginRouter,
    ClientRegistrationRouter,
    ErrorRouter,
    UserProfileRouter,
    MyInformationRouter,
    MyCarsRouter,
    MyRecordsRouter,
    ClientLogoutRouter
];

routers.forEach((Router) => {
    const router = new Router();

    app.initRouter(router.getRouter());
})

app.listen(3020);
