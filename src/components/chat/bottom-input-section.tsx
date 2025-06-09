import TextToLatex from "@components/global/textToLatex";
import { Mic, SendHorizontal } from "lucide-react";
import { useChat } from "@components/hooks/use-chat";
import useAudio from "@components/hooks/use-audio";
import { cn } from "@src/lib/utils";
import { Button } from "@components/ui/button";

const BottomInputSection = () => {
  const { handleSubmit } = useChat();
  const { toggleMic, isSpeaking } = useAudio();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div className="w-full flex py-1 px-2 gap-2 pb-2.5">
        <Button
          variant={"outline"}
          className={cn(!!isSpeaking && "bg-blue-500 hover:bg-blue-700")}
          onClick={async () => {
            await toggleMic();
          }}
          type="reset"
        >
          <Mic className="h-full" />
        </Button>

        <div className="justify-end h-max flex-1">
          <TextToLatex />
        </div>

        <div className="h-full">
          <Button onClick={handleSubmit} variant={"outline"}>
            <SendHorizontal className=" h-full " />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BottomInputSection;
