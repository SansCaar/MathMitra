import { v4 as uuid } from "uuid";
import { useAtomValue, useSetAtom } from "jotai";
import { getImageDataUrl } from "@dgmjs/export";
import { CanvasAtom } from "@src/atoms/CanvasAtom";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { SocketsAtom } from "@src/atoms/SocketsAtom";
import { CONSTANTS } from "@src/lib/constants";
import TextBoxAtom from "@src/atoms/textBoxAtom";
import ChatAtom from "@src/atoms/ChatAtom";
import { useParams } from "next/navigation";
import axios from "axios";

export const useChat = () => {
  const chat = useAtomValue(ChatAtom);
  const setChat = useSetAtom(ChatAtom);
  const setSockets = useSetAtom(SocketsAtom);
  const sockets = useAtomValue(SocketsAtom);
  const textBoxValue = useAtomValue(TextBoxAtom);
  const setTextBoxValue = useSetAtom(TextBoxAtom);
  const canvasEditor = useAtomValue(CanvasAtom);
  const questionId = useParams().question_id;
  const [questionTitle, setQuestionTitle] = useState("");

  const handleSubmit = async (type: "suggestion" | "nextStep") => {
    const responseId = uuid();
    addMessage({
      user: "Test",
      message: textBoxValue,
      responseId,
      isGenerating: false,
      isLoading: true,
    });

    setTextBoxValue("");

    const imageData = await exportImage();
    {
      /* const jsonPaths = await exportJsonPaths();
    const imageBlob = await exportImageBlob(); */
    }

    const chatsocket = sockets.chatSocket;

    chatsocket?.on("connect", () => {
      console.log("socket connected");
    });

    const contextData = {
      previousMsg: chat.messages,
      canvasData: imageData,
      currentMsg: textBoxValue,
      type,
      question: questionTitle,
    };

    chatsocket?.emit("chat_message", textBoxValue, contextData);

    chatsocket?.on("message", (m) => {
      const { data, done } = JSON.parse(m);

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
  {
    /* const exportJsonPaths = async () => {
    if (!canvasEditor) return;
    const json = await canvasEditor.saveToJSON();
    return json;
  }; */
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
      return {
        ...prev,
        messages: [
          ...everyThingExceptSteaming,
          { id: responseId, message, userId: user, response },
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
    if (!sockets.chatSocket) {
      const socket = io(`${CONSTANTS.SOCKET_SERVER_API}/chat`);
      setSockets((prev) => {
        return {
          ...prev,
          chatSocket: socket,
        };
      });
      return;
    }
  }, []);

  useEffect(() => {
    let title = "";
    (async () => {
      try {
        title =
          (
            await axios.post(`/api/questions/viewOne`, {
              questionId: questionId,
            })
          )?.data.title ?? "";
      } catch (err) {
        title = "Playground";
      }
      setQuestionTitle(title);
    })();
  }, [questionId]);

  return {
    handleSubmit,
  };
};
