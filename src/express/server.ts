import http from "http";
import { Server } from "socket.io";
import { createSocketNamespaces } from "./namespaces";

const server = http.createServer();

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user Connected");
});

const SOCKET_SERVER_PORT = process.env.port || 3001;

// This can be used to handle multiple sockets 
export const sockets = createSocketNamespaces(io);

server.listen(SOCKET_SERVER_PORT, () => {
  console.log(`express Server is running on port ${SOCKET_SERVER_PORT}`);
});
