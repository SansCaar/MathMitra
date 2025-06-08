import { Editor } from "@dgmjs/core";
import { atom } from "jotai";

type TQuestion = {
  id: string;
  question: string;
  providedSolution?: string;
  } | undefined;


export type TMessage = {
  id: string;
  message: string;
  response?: string;
  userId: string;
  interupted?: boolean;
}

type TChatAtom  ={
  id: string;
  question?: TQuestion;
  messages: TMessage[] | [];
  userId: string;
  current?:TMessage;
  snapshot?: Blob;
}



const ChatAtom = atom<TChatAtom>(
  {
    id: '',
    messages: [],
    userId: '',
  }
);


export default ChatAtom;
