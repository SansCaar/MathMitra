import { TMessage } from "@src/atoms/ChatAtom";
import { setupSteamingRecognition } from "@src/server/ai/audio";
import { generateAnswerStream } from "@src/server/ai/genAi";
import { generateTts } from "@src/server/ai/tts";
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
  socket.on(
    "chat_message",
    async (currentMessage: string, previousMessages: TMessage) => {
      const d = await generateAnswerStream({
        /* TODO: Add correct formatting here */
        contents: `
            Here is what is the current message:
            ${currentMessage}`,
        type: "suggestion",
      });

      let response: string = "";
      for await (const chunk of d) {
        response += chunk.text as string;
        socket.send(
          JSON.stringify({
            data: response,
            done: false,
          }),
        );
      }

      socket.send(
        JSON.stringify({
          data: response,
          done: true,
        }),
      );
    },
  );
});

let { streamingRecognizer, audioId } = await setupSteamingRecognition();
let isCallbackSet = false;

io.of("/audio").on("connection", async (socket) => {
  if (!isCallbackSet) {
    streamingRecognizer?.on("data", (data) => {
      socket.send(JSON.stringify({ success: true, data, audioId }));
    });

    isCallbackSet = true;
  }

  socket.on("transcribe", async (arrayBuffer: ArrayBuffer) => {
    streamingRecognizer?.write(arrayBuffer);
  });
});

const SOCKET_SERVER_PORT = process.env.port || 3001;

server.listen(SOCKET_SERVER_PORT, () => {
  console.log(`express Server is running on port ${SOCKET_SERVER_PORT}`);
});
