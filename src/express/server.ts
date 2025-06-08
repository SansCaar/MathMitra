import http from "http";
import { Server } from "socket.io";
import "./chat-socket";

export const server = http.createServer();
export let io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const SOCKET_SERVER_PORT = process.env.port || 3001;

server.listen(SOCKET_SERVER_PORT, () => {
  console.log(`express Server is running on port ${SOCKET_SERVER_PORT}`);
});
