import { generateAnswerStream } from "@src/server/ai/genAi";
import http from "http";
import { Server } from "socket.io";

export const server = http.createServer();
export let io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.of("/chat").on("connection", (socket) => {
  socket.on("chat_message", async (currentMessage: string, context: []) => {
    const d = await generateAnswerStream({
      contents: [""],
    });

    let response: string = "";
    for await (const chunk of d) {
      response += chunk.text as string;
      socket.send(response);
    }

    socket.send("done");
  });
});

const SOCKET_SERVER_PORT = process.env.port || 3001;

server.listen(SOCKET_SERVER_PORT, () => {
  console.log(`express Server is running on port ${SOCKET_SERVER_PORT}`);
});
