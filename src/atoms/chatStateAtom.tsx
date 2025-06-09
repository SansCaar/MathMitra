import { atom } from "jotai";

type TchatStateAtom = {
  mode: "latex" | "text";
  autoPlayAudio: boolean;
  activeAudioId?: string;
}

export const chatStateAtom = atom<TchatStateAtom>({
  mode: "text",
  autoPlayAudio: true,
})
