import { generateTts } from "@src/server/ai/tts";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();
  const text = body.text;

  if (!text) {
    return NextResponse.json({
      error: "No text provided",
    });
  }

  let audioId: string | undefined = "";
  try {
    audioId = await generateTts(text);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Failed to generate TTS",
      status: 500,
    });
  }

  if (!audioId) {
    return NextResponse.json({
      error: "failed to generate TTS",
      status: 404,
    });
  }

  return NextResponse.json({ audioId, text });
};
