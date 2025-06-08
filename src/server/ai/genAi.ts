"use server";

import { GenerateContentParameters, GoogleGenAI } from "@google/genai";
import "@src/server/utils/env";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEN_AI_KEY,
});

const DEFAULT_MODAL = "gemini-2.5-flash-preview-05-20";

/**
 * A Wrapper function to generate answer from google genai
 * with default modals already set.
 *
 * @deafult modal: gemini-2.5-flash-preview-05-20
 */
export const generateAnswer = async (
  props: Partial<GenerateContentParameters> & {
    contents: GenerateContentParameters["contents"];
  },
) => {
  return await ai.models.generateContent({
    model: DEFAULT_MODAL,
    ...props,
  });
};

/**
 * A wrapper function to generate answer stream from google genai
 * with default modals already set.
 *
 * @deafult modal: gemini-2.5-flash-preview-05-20
 */
export const generateAnswerStream = async (
  props: Partial<GenerateContentParameters> & {
    contents: GenerateContentParameters["contents"];
  },
) => {
  return await ai.models.generateContentStream({
    model: DEFAULT_MODAL,
    ...props,
  });
};
