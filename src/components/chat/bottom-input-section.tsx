import TextToLatex from "@components/global/textToLatex";
import { Mic, SendHorizontal } from "lucide-react";
import { useChat } from "@components/hooks/use-chat";
import useAudio from "@components/hooks/use-audio";
import { cn } from "@src/lib/utils";

const BottomInputSection = () => {
  const { handleSubmit } = useChat();
  const { toggleMic, isSpeaking } = useAudio();

  return (
    <div className="w-full flex py-4 gap-2">
      <button
        className={cn(
          "h-full aspect-square flex items-center justify-center bg-gray-400 text-white font-bold p-2.5  rounded",
          isSpeaking && "bg-blue-500 hover:bg-blue-700",
        )}
        onClick={async () => {
          await toggleMic();
        }}
      >
        <Mic className=" h-full " />
      </button>

      <div className="justify-end h-max flex-1">
        <TextToLatex />
      </div>
      <div className="h-full">
        <button
          onClick={handleSubmit}
          className="h-full  aspect-square flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <SendHorizontal className=" h-full " />
        </button>
      </div>
    </div>
  );
};

export default BottomInputSection;
