import mysql from 'mysql-await';

export default class Database {
    static connection = null;

    static getConnection() {
        if (this.connection) {
            return this.connection;
        }

        this.connection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'Alisa',
            password: 'vlrevlor',
            database: 'service_centres'
        })

        this.connection.connect();

        return this.connection;
    }
}
