import { atom } from "jotai";

type TQuestion = {
  id: string;
  question: string;
  providedSolution?: string;
  } | undefined;


type TMessage = {
  id: string;
  message: string;
  userId: string;
}

type TChatAtom  ={
  id: string;
  question?: TQuestion;
  messages: TMessage[] | [];
  userId: string;
  current?:TMessage;
}

const ChatAtom = atom<TChatAtom>(
  {
    id: '',
    messages: [],
    userId: '',
  }
);


export default ChatAtom;
