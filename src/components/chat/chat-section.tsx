import ChatAtom from "@src/atoms/ChatAtom";
import { useAtomValue } from "jotai";
import Latex from "react-latex-next";

const ChatSection = () => {
  const chat = useAtomValue(ChatAtom);
  const isGenerating = chat.states.isLoading || chat.states.isGenerating;

  return (
    <div className="flex-col flex gap-4  h-full flex-1 py-5  overflow-y-auto px-2.5">
      {chat.messages.map((message, index) => {
        const isTranscription = message.mode === "transcription";
        return (
          <>
            {isTranscription ? (
              <div
                key={`message-${message.id} - ${index}`}
                className="self-end w-fit bg-gray-300 rounded-md p-2 text-md text-gray-800"
              >
                <Latex>
                  {message.finalMessage} {message.interimMessage}
                </Latex>
              </div>
            ) : message.message ? (
              <div
                key={`message-${message.id} - ${index}`}
                className="self-end w-fit bg-gray-300 rounded-md p-2 text-md text-gray-800"
              >
                <Latex>{message.message}</Latex>
              </div>
            ) : null}

            {!isTranscription && !message.message && (
              <div className="px-2 text-sm text-gray-500">
                Took a look at the canvas and the probable questions.
              </div>
            )}

            {!!message ? (
              <div
                key={`response-${message.id}`}
                className=" w-full  rounded-md p-2 text-md text-gray-800"
              >
                {<Latex>{message?.response || ""}</Latex>}
              </div>
            ) : null}
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
