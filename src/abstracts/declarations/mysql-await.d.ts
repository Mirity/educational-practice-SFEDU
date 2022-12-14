declare module 'mysql-await' {
    import { ParamsForQuery } from "../common";

    export interface ConnectionParams {
        host: string | undefined,
        user: string | undefined,
        password: string | undefined,
        database: string | undefined,
    }

    export interface Connection {
        connect(): void;
        awaitQuery<T>(query: string, params: ParamsForQuery | null): Promise<T>;
        on(errorText: string, callback: (err: any) => void): any;
    }


    interface DbQueryInfo {
        insertId: number;
    }

    function createConnection(params: ConnectionParams): Connection
}