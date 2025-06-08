"use client";

import ChatAtom from "@src/atoms/ChatAtom";
import { v4 as uuid } from "uuid";
import BottomInputSection from "./bottom-input-section";
import { Mic, SendHorizontal } from "lucide-react";
import { useAtomValue, useSetAtom } from "jotai";

const ChatArea = ({}) => {
  const chat = useAtomValue(ChatAtom);
  const setChat = useSetAtom(ChatAtom);

  const addMessage = ({
    message,
    user,
    response,
  }: {
    message: string;
    user: string;
    response?: string;
  }) => {
    setChat((prev) => {
      return {
        ...prev,
        messages: [
          ...prev.messages,
          { id: uuid(), message, userId: user, response },
        ],
      };
    });
  };

  return (
    <div className="h-full w-1/4 rounded-md flex flex-col">
      <div className="flex-col flex gap-4  h-full justify-end">
        {chat.messages.map((message, index) => {
          return (
            <>
              <div key={`message-${message.id}`} className="self-end w-fit bg-gray-300 rounded-md p-2 text-md text-gray-800">
                {message.message}
              </div>
              {message.response && (
                <div key={`response-${message.id}`} className=" w-full  rounded-md p-2 text-md text-gray-800">
                  {message.response}
                </div>
              )}
            </>
          );
        })}
      </div>
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
                response: "Meowwwwwww"
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
