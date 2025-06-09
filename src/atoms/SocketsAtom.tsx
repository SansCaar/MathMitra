import { atom } from "jotai";
import { DefaultEventsMap, Socket } from "socket.io";

type TSocketAtom = {
  chatSocket?: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;
  textToSpeechSocket?: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;
  speechToTextSocket?: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;
  visionSocket?: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;
};

export const SocketsAtom = atom<TSocketAtom>({
});
