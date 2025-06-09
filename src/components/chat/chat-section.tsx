import ChatAtom from "@src/atoms/ChatAtom";
import { useAtomValue } from "jotai";

const ChatSection = () => {
  const chat = useAtomValue(ChatAtom);
  return (
    <div className="flex-col flex gap-4  h-full justify-end">
      {chat.messages.map((message, index) => {
        const isTranscription = message.mode === "transcription";
        return (
          <>
            <div
              key={`message-${message.id} - ${index}`}
              className="self-end w-fit bg-gray-300 rounded-md p-2 text-md text-gray-800"
            >
              {isTranscription
                ? `${message.finalMessage}  ${message.interimMessage}`
                : message.response}
            </div>
            {message.response && (
              <div
                key={`response-${message.id}`}
                className=" w-full  rounded-md p-2 text-md text-gray-800"
              >
                {message.response}
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default ChatSection;
