import { Editor } from "@dgmjs/core";
import { atom } from "jotai";
import { WebSocket } from "socket.io-client";

type TQuestion =
  | {
      id: string;
      question: string;
      providedSolution?: string;
    }
  | undefined;

export type TMessage = {
  id: string;
  response?: string;
  userId: string;
  interupted?: boolean;
} & (TAudioMessage | TTypedMessage);

type TAudioMessage = {
  mode: "transcription";
  interimMessage: string;
  finalMessage: string;
};

type TTypedMessage = {
  mode: "typing";
  message: string;
};

type TChatAtom = {
  id: string;
  question?: TQuestion;
  messages: TMessage[];
  userId: string;
  current?: TMessage;
  snapshot?: Blob;
  socket?: WebSocket;
  states: {
    isGenerating: boolean;
    isLoading: boolean;
    speaker?: "user" | "teacher";
    isMuted: boolean;
  };
};

const ChatAtom = atom<TChatAtom>({
  id: "",
  messages: [],
  userId: "",
  socket: undefined,
  states: {
    isGenerating: false,
    isLoading: false,
    isMuted: false,
    speaker: undefined,
  },
});

export default ChatAtom;
