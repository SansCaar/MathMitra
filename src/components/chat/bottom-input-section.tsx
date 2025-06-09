import { Mic, SendHorizontal } from "lucide-react";
import useAudio from "@components/hooks/use-audio";
import { cn } from "@src/lib/utils";
import { Button } from "@components/ui/button";
import MathInput from "@components/mathinput/MathInput";
import { useChat } from "@components/hooks/use-chat";

const BottomInputSection = () => {
  const { toggleMic, isSpeaking } = useAudio();
  const { handleSubmit } = useChat();

  {
    /* const [audioFileName, setAudioFileName] = useState(null); */
  }
  {
    /* const textValue = useAtomValue(TextBoxAtom); */
  }
  {
    /* const handleSubmit = async () => {
    const response = await axios.post("/api/ai/tts", {
      text: textValue,
    });

    setAudioFileName(response.data.audioId);
  };
  useEffect(() => {
    if (!audioFileName) return;

    const audio = new Audio(`/${audioFileName}.mp3`);
    audio.play();

    audio.onended = () => {
      setAudioFileName(null);
    };
  }, [audioFileName]); */
  }
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
          <MathInput />
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
