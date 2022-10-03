import App from './App.js'
import ClientRouter from "./routers/client-router.js";
import MasterRouter from "./routers/master-router.js";
import CarRouter from "./routers/car-router.js";
import ServiceCenterRouter from "./routers/service-center-router.js";
import ServiceRecordRouter from "./routers/service-record-router.js";
import LoginRouter from "./routers/login-router.js";
import RegistrationRouter from "./routers/registration-router.js";
import ErrorRegistrationRouter from "./routers/error-registration-router.js";
import ErrorLoginRouter from "./routers/error-login-router.js";
import AlreadyLoginRouter from "./routers/already-login-router.js";
import UserProfileRouter from "./routers/user-profile-router.js";
import NeedToLoginRouter from "./routers/need-to-login-router.js";
import MyInformationRouter from "./routers/my-information-router.js";
import MyCarsRouter from "./routers/my-cars-router.js";
import MyRecordsRouter from "./routers/my-records-router.js";

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
    ClientRouter,
    MasterRouter,
    CarRouter,
    ServiceCenterRouter,
    ServiceRecordRouter,
    LoginRouter,
    RegistrationRouter,
    ErrorRegistrationRouter,
    ErrorLoginRouter,
    AlreadyLoginRouter,
    UserProfileRouter,
    NeedToLoginRouter,
    MyInformationRouter,
    MyCarsRouter,
    MyRecordsRouter
];

routers.forEach((Router) => {
    const router = new Router();

    app.initRouter(router.getRouter());
})

app.listen(3020);
