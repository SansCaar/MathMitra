import { TMessage } from "@src/atoms/ChatAtom";
import { setupSteamingRecognition } from "@src/server/ai/audio";
import { generateAnswerStream } from "@src/server/ai/genAi";
import http from "http";
import { Server } from "socket.io";
import { v4 as uuid } from "uuid";

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
    async (data: {
      previousMsg: TMessage[];
      canvasData: string;
      currentMsg: string;
      question?: string;
      type: "suggestion" | "nextStep";
    }) => {
      const d = await generateAnswerStream({
        contents: `
          <question> 
          ${data.currentMsg}
          </question>
          <context>
          <current>
            ${data.currentMsg}
          </current>
          <previous>
          ${JSON.stringify(data.previousMsg)}
          </previous>
          <canvas>
          ${data.canvasData}
          </canvas>
          </context>`,
        type: data.type,
      });

      let response: string = "";
      /* for await (const chunk of d) {
        response += chunk.text as string; */
        /* socket.send(
          JSON.stringify({
            data: response,
            done: false,
          }), */
        /* ); */
      /* } */

      /* socket.send(
        JSON.stringify({
          data: response,
          done: true,
        }), */
      /* ); */
    },
  );
/*
  socket.on("disconnect", () => {
    console.log("user disconnected");
  }); */
});
/*
let { streamingRecognizer } = await setupSteamingRecognition();
let isCallbackSet = false;
let isDisabled = false;
let timeout: NodeJS.Timeout | undefined;

io.of("/audio").on("connection", async (socket) => {
  isDisabled = false;
  const audioId = uuid();

  if (!isCallbackSet) {
    streamingRecognizer?.on("data", (data) => {
      if (timeout !== undefined) {
        clearTimeout(timeout);
        timeout = undefined;
      }

      timeout = setTimeout(() => {
        socket.emit("timeout", audioId);
        streamingRecognizer?.end();
        isDisabled = true;
      }, 4_000);
      socket.send(JSON.stringify({ success: true, data, audioId }));
    });

    isCallbackSet = true;
  }

  socket.on("transcribe", async (arrayBuffer: ArrayBuffer) => {
    setTimeout(async () => {
      streamingRecognizer?.end();
      socket.emit("maxtimeout", audioId);
      streamingRecognizer = (await setupSteamingRecognition())
        .streamingRecognizer;
    }, 350_000);

    if (isDisabled) return;
    streamingRecognizer?.write(arrayBuffer);
  });
}); */

const SOCKET_SERVER_PORT = process.env.SOCKET_PORT || 3001;

server.listen(SOCKET_SERVER_PORT, () => {
  console.log(`express Server is running on port ${SOCKET_SERVER_PORT}`);
});
