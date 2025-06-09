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
      className="w-full p-2.5"
    >
          <MathInput />
    </form>
  );
};

export default BottomInputSection;
