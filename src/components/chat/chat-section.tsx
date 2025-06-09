import ChatAtom from "@src/atoms/ChatAtom";
import { convertToLatex } from "@src/utils/latex";
import { useAtomValue } from "jotai";

const ChatSection = () => {
  const chat = useAtomValue(ChatAtom);
  const isGenerating = chat.states.isLoading || chat.states.isGenerating;

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
      {isGenerating && (
        <div
          key={`message-${chat.messages.length}`}
          className="self-start h-max bg-gray-100 rounded-md p-2 text-md text-gray-800 w-3/4 flex gap-2.5 flex-col animate-pulse"
        >
          Generating............

          <div className="message flex gap-2.5 flex-col">
            <div
              key={`message-${chat.messages.length}`}
              className="self-start h-2 bg-gray-300 rounded-md  text-md text-gray-800 w-2/4"
            ></div>
            <div
              key={`message-${chat.messages.length}`}
              className="self-start h-2 bg-gray-300 rounded-md  text-md text-gray-800 w-3/4"
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSection;
