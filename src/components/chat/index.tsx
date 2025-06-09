"use client";

import BottomInputSection from "./bottom-input-section";
import ChatSection from "./chat-section";

const ChatArea = ({}) => {
  return (
    <div className="h-full w-2/5 min-w-80 rounded-md flex flex-col overflow-hidden">
      <ChatSection />
      <BottomInputSection />
    </div>
  );
};

export default ChatArea;
