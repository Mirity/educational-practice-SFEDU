import mysql from 'mysql-await';
import Environment from "./models/environment.js";

export default class Database {
    static connection = null;

    static getConnection() {
        if (this.connection) {
            return this.connection;
        }

        const environment = new Environment();

        this.connection = mysql.createConnection({
            host: environment.getHost(),
            user: environment.getUser(),
            password: environment.getPassword(),
            database: environment.getDbName(),
        })

        this.connection.connect();

        return this.connection;
    }

    static makeQuery(query, params) {
        const connection = this.getConnection();

        return connection.awaitQuery(query, params);
    }
}
