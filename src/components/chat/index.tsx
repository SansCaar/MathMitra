"use client";

import BottomInputSection from "./bottom-input-section";
import ChatSection from "./chat-section";

const ChatArea = ({}) => {
  return (
    <div className="h-full w-1/4 rounded-md flex flex-col">
      <ChatSection />
      <BottomInputSection />
    </div>
  );
};

export default ChatArea;
