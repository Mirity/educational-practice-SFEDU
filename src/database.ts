import mysql, {Connection, DbQueryInfo} from 'mysql-await';
import Environment from "./models/environment.js";
import { ParamsForQuery } from "./abstracts/common";

export default class Database {
    static connection: Connection;

    static getConnection(): Connection {
        if (this.connection) {
            return this.connection;
        }

        this.connection = mysql.createConnection({
            host: Environment.getDbHost(),
            user: Environment.getDbUser(),
            password: Environment.getDbPassword(),
            database: Environment.getDbName(),
        })

        this.connection.on(`error`, (err) => {
            console.error(`Connection error ${err.code}`);
        });

        this.connection.connect();

        return this.connection;
    }

    static async makeQuery<T>(query: string, params: ParamsForQuery | null): Promise<T> {
        const connection = this.getConnection();

        return connection.awaitQuery<T>(query, params).catch((error: any) => {
            throw error;
        }) as Promise<T>;
    }

    static async makeAddQuery<T>(query: string, params: ParamsForQuery | null): Promise<DbQueryInfo> {
        const connection = this.getConnection();

        return connection.awaitQuery<T>(query, params).catch((error: any) => {
            throw error;
        }) as Promise<DbQueryInfo>;
    }
}
