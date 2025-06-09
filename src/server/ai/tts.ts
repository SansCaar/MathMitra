import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import { writeFile } from "fs/promises";
import { v4 as uuid } from "uuid";

const client = new TextToSpeechClient({
  keyFilename: ".keys/key.json",
});

export const generateTts = async (text: string) => {
  const [response] = await client.synthesizeSpeech({
    input: { text },
    voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
    audioConfig: { audioEncoding: "MP3" },
  });

  if (response.audioContent === undefined) {
    console.log("Failed to generate TTS");
    return;
  }

  const audioId = uuid();

  await writeFile(
    `./public/${audioId}.mp3`,
    response.audioContent,
    "binary",
  );

  return audioId;
};
