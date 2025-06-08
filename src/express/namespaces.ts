import { DefaultEventsMap, Server } from "socket.io";

export const createSocketNamespaces = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
) => {
  return { chatNamespace: io.of("/chat") };
};
