import speech from "@google-cloud/speech";
import { v4 as uuid } from "uuid";

const client = new speech.SpeechClient({
  keyFilename: ".keys/key.json",
});

let streamingRecognizer: ReturnType<typeof client.streamingRecognize> | null =
  null;

export const setupSteamingRecognition = async () => {
  streamingRecognizer = client.streamingRecognize({
    config: {
      encoding: "WEBM_OPUS",
      // TODO: Make this language code parameterized
      languageCode: "en-US",
      enableAutomaticPunctuation: true,
      sampleRateHertz: 16000,
      enableSpokenEmojis: {
        value: true,
      },
    },
    interimResults: true,
  });
  const audioId = uuid();

  return { streamingRecognizer, audioId };
};

export const closeAudioTranscription = async () => {
  if (streamingRecognizer !== null) {
    streamingRecognizer.end();
    streamingRecognizer = null;
  }
};
