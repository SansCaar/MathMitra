import { LightbulbIcon, Mic, SendHorizontal } from "lucide-react";
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
      className="w-full"
    >
      <div className="w-full flex items-end gap-2 p-2 pb-3">
        <Button
          variant={"outline"}
          className={cn(
            "h-10 w-10 p-0 flex-shrink-0",
            !!isSpeaking && "bg-blue-500 hover:bg-blue-700",
          )}
          onClick={async () => {
            await toggleMic();
          }}
          type="reset"
        >
          <Mic className="h-5 w-5" />
        </Button>

        <div className="flex-1 min-w-0">
          <MathInput />
        </div>

        <Button
          onClick={() => handleSubmit("nextStep")}
          variant={"outline"}
          className="h-10 w-10 p-0 flex-shrink-0"
        >
          <LightbulbIcon className="h-5 w-5" />
        </Button>

        <Button
          onClick={() => handleSubmit("suggestion")}
          variant={"outline"}
          className="h-10 w-10 p-0 flex-shrink-0"
        >
          <SendHorizontal className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};

export default BottomInputSection;
