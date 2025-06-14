import { v4 as uuid } from "uuid";
import { useAtomValue, useSetAtom } from "jotai";
import { getImageDataUrl } from "@dgmjs/export";
import { CanvasAtom } from "@src/atoms/CanvasAtom";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { CONSTANTS } from "@src/lib/constants";
import TextBoxAtom from "@src/atoms/textBoxAtom";
import ChatAtom from "@src/atoms/ChatAtom";
import { DefaultEventsMap, Socket } from "socket.io";
import { useParams } from "next/navigation";
import axios from "axios";

type tsocket = Socket<DefaultEventsMap, DefaultEventsMap>;
export const useChat = () => {
  const params = useParams();
  const slug = params.question_id;
  const [title, setTitle] = useState<string>("fetching playground title...");

  useEffect(() => {
    let title = "";
    (async () => {
      try {
        title =
          (
            await axios.post(`/api/questions/viewOne`, {
              questionId: slug,
            })
          )?.data.body?.question ?? "Playground";
      } catch (err) {
        title = "Playground";
      }
      setTitle(title);
    })();
  }, [slug]);

  const chat = useAtomValue(ChatAtom);
  const setChat = useSetAtom(ChatAtom);
  const chatSocket = useRef<tsocket | null>(null);
  const textBoxValue = useAtomValue(TextBoxAtom);
  const setTextBoxValue = useSetAtom(TextBoxAtom);
  const canvasEditor = useAtomValue(CanvasAtom);

  const handleSubmit = async (type: "suggestion" | "nextStep") => {
    const responseId = uuid();
    addMessage({
      user: "Test",
      message: textBoxValue,
      responseId,
      isGenerating: false,
      isLoading: true,
    });

    if (!chatSocket.current) return;

    setTextBoxValue("");

    const imageData = await exportImage();
    {
      /* const jsonPaths = await exportJsonPaths();
    const imageBlob = await exportImageBlob(); */
    }

    const exportJsonPaths = async () => {
      if (!canvasEditor) return;
      const json = await canvasEditor.saveToJSON();
      return json;
    };

    chatSocket.current?.on("connect", () => {
      console.log("socket connected");
    });

    const contextData = {
      previousMsg: chat.messages,
      canvasData: imageData,
      currentMsg: textBoxValue,
      type,
      question: title || "",
      exportJsonPaths,
    };

    chatSocket.current?.emit("chat_message", contextData);

    chatSocket.current?.on("message", (m) => {
      const { data, done, responseId } = JSON.parse(m);

      addMessage({
        user: "Test",
        message: textBoxValue,
        response: data,
        responseId,
        isGenerating: !done,
        isLoading: false,
      });
    });
  };

  const exportImage = async () => {
    if (!canvasEditor) return;
    const dataImage = await getImageDataUrl(
      canvasEditor.canvas,
      canvasEditor.getPages()[0],
      [],
      { scale: 0.5 },
    );

    return dataImage;
  };

  {
    /* const exportImageBlob = async () => {
    if (!canvasEditor) return;
    const dataImage = await getImageBlob(
      canvasEditor.canvas,
      canvasEditor.getPages()[0],
      [],
      { scale: 0.5 },
    );

    return dataImage;
  };
*/
  }

  const addMessage = ({
    message,
    user,
    response,
    responseId,
    isGenerating: isGenerating = false,
    isLoading = false,
  }: {
    message: string;
    user: string;
    response?: string;
    responseId: string;
    isGenerating?: boolean;
    isLoading?: boolean;
  }) => {
    setChat((prev) => {
      const everyThingExceptSteaming = prev.messages.filter(
        (message) => message.id !== responseId,
      );

      console.log(everyThingExceptSteaming);
      return {
        ...prev,
        messages: [
          ...everyThingExceptSteaming,
          ...(message || response
            ? [{ id: responseId, message, userId: user, response }]
            : []),
        ],
        states: {
          ...prev.states,
          isGenerating,
          isLoading,
        },
      };
    });
  };

  useEffect(() => {
    if (!chatSocket?.current) {
      chatSocket.current = io(`${CONSTANTS.SOCKET_SERVER_API}/chat`);
    }
  }, []);

  return {
    handleSubmit,
  };
};
