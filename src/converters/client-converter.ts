import { Client } from "../abstracts/client";
import ClientEntity from "../models/entity/client-entity.js";

export default class ClientConverter {
    public static convertClientToEntity(client: Client): ClientEntity {
        return new ClientEntity(client);
    }

    public static convertClientsToEntities(clients: Client[]): ClientEntity[] {
        return clients.map(client =>this.convertClientToEntity(client));
    }
}