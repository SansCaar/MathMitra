import ChatAtom from "@src/atoms/ChatAtom";
import { convertToLatex } from "@src/utils/latex";
import { useAtomValue } from "jotai";

const ChatSection = () => {
  const chat = useAtomValue(ChatAtom);
  const isGenerating = chat.states.isGenerating;

  return (
    <div className="flex-col flex gap-4  h-full flex-1 py-5  overflow-y-auto px-2.5">
      {chat.messages.map((message, index) => {
        const isTranscription = message.mode === "transcription";
        return (
          <>
            <div
              key={`message-${message.id} - ${index}`}
              className="self-end w-fit bg-gray-300 rounded-md p-2 text-md text-gray-800"
            >
              {isTranscription
                ? convertToLatex(
                    `${message.finalMessage}  ${message.interimMessage}`,
                  )
                : message.message
                  ? convertToLatex(message.message)
                  : null}
            </div>

            {message.response && (
              <div
                key={`response-${message.id}`}
                className=" w-full  rounded-md p-2 text-md text-gray-800"
              >
                {convertToLatex(message.response)}
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default ChatSection;
