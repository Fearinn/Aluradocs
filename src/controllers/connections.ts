import { IConnection } from "../../interfaces/Connection";

const connections: IConnection[] = [];

export function findConnection(connection: IConnection) {
  return connections.find(
    (savedConnection) =>
      connection.documentName === savedConnection.documentName &&
      connection.username === savedConnection.username
  );
}

export function addConnection(connection: IConnection) {
  connections.push(connection);
}

export function getConnections(documentName: string) {
  return connections
    .filter((connection) => connection.documentName === documentName)
    .map((connection) => connection.username);
}

export function removeConnection({ documentName, username }: IConnection) {
  const index = connections.findIndex(
    (connection) =>
      connection.documentName === documentName &&
      connection.username === username
  );

  if (index !== -1) connections.splice(index, 1);
}
