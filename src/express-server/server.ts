import http from "http";
import { Server } from "socket.io";

const server = http.createServer();

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

server.listen(3000);
