import { sockets } from "./server";

sockets.chatNamespace.on("connection", (socket) => {
  console.log("user Connected");
});
