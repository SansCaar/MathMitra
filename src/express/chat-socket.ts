import { io, server } from "./server";
import { Server } from "socket.io";

const socketIo =
  io ??
  new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

const socket = socketIo.of("/chat").on("connection", (socket) => {
  console.log("chat Connected");
});

socket.on("connection", (socket) => {
  console.log("chat Connected");
});
