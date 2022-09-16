import * as dotenv from 'dotenv';


export default class Environment {
    constructor() {
        dotenv.config()
    }

    getHost() {
        return process.env.DB_HOST;
    }

    getUser() {
        return process.env.DB_USER;
    }

    getPassword() {
        return process.env.DB_PASSWORD;
    }

    getDbName() {
        return process.env.DB_NAME;
    }

}