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
    }

    function createConnection(params: ConnectionParams): Connection
}