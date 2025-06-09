import type { google } from "@google-cloud/speech/build/protos/protos";
import ChatAtom from "@src/atoms/ChatAtom";
import { CONSTANTS } from "@src/lib/constants";
import { useAtomValue, useSetAtom } from "jotai";
import { useRef } from "react";
import { DefaultEventsMap } from "socket.io";
import { io, Socket, WebSocket } from "socket.io-client";

const useAudio = () => {
  const audioSocket = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(
    null,
  );
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);

  const setChatAtom = useSetAtom(ChatAtom);

  type tgoogleTranscriptionResponse = {
    success: boolean;
    audioId: string;
    data: [
      google.cloud.speech.v1.IStreamingRecognizeResponse,
      google.cloud.speech.v1.IStreamingRecognizeRequest | undefined,
      {} | undefined,
    ];
  };

  const connectToAudioSocket = async () => {
    if (audioSocket.current !== null) return;

    const webSocket = io(`${CONSTANTS.SOCKET_SERVER_API}/audio`);
    audioSocket.current = webSocket;
    console.log("New socket was created");
  };

  const listenToUserAudio = async () => {
    if (audioSocket === null) {
      console.error("Socket is not connected");
      return;
    }

    try {
      stream.current = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          noiseSuppression: true,
        },
      });

      mediaRecorder.current = new MediaRecorder(stream.current, {
        mimeType: "audio/webm;codecs=opus",
      });

      mediaRecorder.current.ondataavailable = async (e) => {
        const data = e.data;
        if (data.size > 0) {
          const arrayBuffer = await data.arrayBuffer();
          audioSocket.current?.emit?.("transcribe", arrayBuffer);
        }
      };

      mediaRecorder.current.start(10);
      setChatAtom((prev) => ({
        ...prev,
        speaker: "user",
      }));
    } catch (e) {
      console.log("error", e);
      // TODO: handle this.
    }
  };

  const stopListeningToUserAudio = async () => {
    setChatAtom((prev) => ({
      ...prev,
      speaker: null,
    }));

    audioSocket?.current?.close();

    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      mediaRecorder.current = null;
    }

    if (stream.current) {
      stream.current.getTracks().forEach((track) => {
        track.stop();
      });
      stream.current = null;
    }
  };

  audioSocket?.current?.on("timeout", (audioId) => {
    console.log("timeout", audioId);
  });

  function updateTranscriptionDataState() {
    let final = "";
    console.log("updating");

    audioSocket.current?.on("message", (m) => {
      const response: tgoogleTranscriptionResponse = JSON.parse(m);

      setChatAtom((prev) => {
        let interim = "";
        response.data?.results?.forEach((result) => {
          const isFinal = result.isFinal;
          const transcript = result.alternatives[0].transcript;
          if (isFinal) final += `\n${transcript}`;
          else interim += transcript;
        });

        const everyMessageExceptLast = prev.messages.filter(
          (message) => message.id !== response.audioId,
        );

        return {
          ...prev,
          states: {
            ...prev.states,
            isGenerating: false,
            isLoading: false,
            isMuted: false,
            speaker: "user",
          },
          messages: [
            ...everyMessageExceptLast,
            {
              id: response.audioId,
              interupted: false,
              mode: "transcription",
              interimMessage: interim,
              finalMessage: final,
            },
          ],
        };
      });
    });
  }
  const chatAtomValues = useAtomValue(ChatAtom);

  const toggleMic = async () => {
    if (chatAtomValues.states.speaker) {
      await stopListeningToUserAudio();
      setChatAtom((prev) => ({
        ...prev,
        states: {
          ...prev.states,
          isGenerating: true,
          isLoading: true,
          isMuted: true,
          speaker: undefined,
        },
      }));
      return;
    }

    setChatAtom((prev) => ({
      ...prev,
      states: {
        ...prev.states,
        isGenerating: false,
        isLoading: false,
        isMuted: false,
        speaker: "user",
      },
    }));

    await connectToAudioSocket();
    await listenToUserAudio();

    updateTranscriptionDataState();
  };

  return {
    audioSocket,
    createAudioSocket: connectToAudioSocket,
    listenToUserAudio,
    stopListeningToUserAudio,
    speaker: chatAtomValues.states.speaker,
    toggleMic,
    isSpeaking: !!chatAtomValues.states.speaker,
  };
};

export default useAudio;
