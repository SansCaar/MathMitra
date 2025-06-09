"use server";

import { GenerateContentParameters, GoogleGenAI } from "@google/genai";
import "@src/server/utils/env";
import {
  SYSTEM_INSTRUCTIONS,
  type tSystemInstructionKey,
} from "./systemInstruction";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEN_AI_KEY,
  vertexai: true,
});

export type tGenerateAnswerPropType = Partial<GenerateContentParameters> & {
  contents: GenerateContentParameters["contents"];
  type?: tSystemInstructionKey;
};

const DEFAULT_MODAL = "gemini-2.5-flash-preview-05-20";

/**
 * A Wrapper function to generate answer from google genai
 * with default modals already set.
 *
 * @deafult modal: gemini-2.5-flash-preview-05-20
 */
export const generateAnswer = async (props: tGenerateAnswerPropType) => {
  return (await ai.models.generateContent({
    config: {
      systemInstruction: SYSTEM_INSTRUCTIONS[props.type || "default"],
    },
    model: DEFAULT_MODAL,
    ...props,
  }));
};

/**
 * A wrapper function to generate answer stream from google genai
 * with default modals already set.
 *
 * @deafult modal: gemini-2.5-flash-preview-05-20
 * @default type: default
 */
export const generateAnswerStream = async (props: tGenerateAnswerPropType) => {
  return await ai.models.generateContentStream({
    model: DEFAULT_MODAL,
    config: {
      systemInstruction: SYSTEM_INSTRUCTIONS[props.type ?? "default"],
    },
    ...props,
  });
};
