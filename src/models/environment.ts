export default class Environment {
    static getDbHost(): string | undefined {
        return process.env.DB_HOST;
    }

    static getDbUser(): string| undefined {
        return process.env.DB_USER;
    }

    static getDbPassword(): string | undefined  {
        return process.env.DB_PASSWORD;
    }

    static getDbName(): string | undefined {
        return process.env.DB_NAME;
    }

}