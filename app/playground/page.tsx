import ChatArea from "@components/chat";
import Canvas from "@components/canvas";
import React from "react";

const Playground = () => {
  return (
    <div className="flex w-full h-full">
      <Canvas showGrid className="flex-1"/>;
      <ChatArea />
    </div>
  );
};

export default Playground;
