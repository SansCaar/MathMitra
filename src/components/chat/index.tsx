"use client";

import BottomInputSection from "./bottom-input-section";

const ChatArea = () => {
  return <div className="h-full w-1/4 bg-gray-200 rounded-md flex flex-col">
    <div className="flex-1 h-full">
     chatArea
    </div>
     {/*  bottom input section with three buttons first mic second text input and third send */}
    <div className="h-full w-full flex flex-col"></div>
    <BottomInputSection />
  </div>
}

export default ChatArea;
