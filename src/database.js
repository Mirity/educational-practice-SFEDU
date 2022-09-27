import mysql from 'mysql-await';
import Environment from "./models/environment.js";

export default class Database {
    static connection = null;

    static getConnection() {
        if (this.connection) {
            return this.connection;
        }

        this.connection = mysql.createConnection({
            host: Environment.getDbHost(),
            user: Environment.getDbUser(),
            password: Environment.getDbPassword(),
            database: Environment.getDbName(),
        })

        this.connection.connect();

        return this.connection;
    }

    static makeQuery(query, params) {
        const connection = this.getConnection();

        return connection.awaitQuery(query, params);
    }
}
