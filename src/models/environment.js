export default class Environment {
    static getDbHost() {
        return process.env.DB_HOST;
    }

    static getDbUser() {
        return process.env.DB_USER;
    }

    static getDbPassword() {
        return process.env.DB_PASSWORD;
    }

    static getDbName() {
        return process.env.DB_NAME;
    }

}