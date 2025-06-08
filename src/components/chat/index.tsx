"use client";

import ChatAtom from "@src/atoms/ChatAtom";
import { v4 as uuid } from "uuid";
import BottomInputSection from "./bottom-input-section";
import { Mic, SendHorizontal } from "lucide-react";
import { useAtomValue, useSetAtom } from "jotai";

const ChatArea = ({}) => {
  const chat = useAtomValue(ChatAtom);
  const setChat = useSetAtom(ChatAtom);

  const addMessage = ({ message, user, response }: { message: string; user: string, response?: string }) => {
    setChat((prev) => {
      return {
        ...prev,
        messages: [...prev.messages, { id: uuid(), message, userId: user, response }],
      };
    });
  };

  return (
    <div className="h-full w-1/4 rounded-md flex flex-col">
      <div className="flex-1 h-full">chatArea</div>
      {/*  bottom input section with three buttons first mic second text input and third send */}
      <div className="w-full flex py-4 gap-2">
        <button className="h-full  aspect-square flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Mic className=" h-full " />
        </button>
        <BottomInputSection />
        <div className="h-full">
          <button
            onClick={() => {
              console.log(chat);
              addMessage({
                user: "GPT",
                message: "Hello",
              });
            }}
            className="h-full  aspect-square flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <SendHorizontal className=" h-full " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
