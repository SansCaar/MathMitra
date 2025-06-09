"use client";

import React, { useEffect, useRef } from "react";
import "mathlive";
import { useAtomValue, useSetAtom } from "jotai";
import TextBoxAtom from "@src/atoms/textBoxAtom";
import { Button } from "@components/ui/button";
import { chatStateAtom } from "@src/atoms/chatStateAtom";
import { LightbulbIcon, Mic, SendHorizontal } from "lucide-react";
import { useChat } from "@components/hooks/use-chat";
import { cn } from "@src/lib/utils";
import useAudio from "@components/hooks/use-audio";
import { Input } from "@components/ui/input";

interface MathField extends HTMLElement {
  getValue: () => string;
  setValue: (value: string) => void;
  focus: () => void;
  insert: (text: string) => void;
}

export default function MathInput() {
  const input = useAtomValue(TextBoxAtom);
  const setInput = useSetAtom(TextBoxAtom);
  const mathFieldRef = useRef<MathField | null>(null);
  const { handleSubmit } = useChat();
  const { isSpeaking, toggleMic } = useAudio();

  const setState = useSetAtom(chatStateAtom);
  const state = useAtomValue(chatStateAtom);

  useEffect(() => {
    if (mathFieldRef.current && input !== mathFieldRef.current.getValue()) {
      mathFieldRef.current.setValue(input);
    }
  }, [input]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="math-input-wrapper w-full">
      <div className="toolbar mb-2 flex gap-1 justify-between items-baseline w-full">
        <Button
          variant={"outline"}
          className={cn(
            "h-10 w-10 p-0 flex-shrink-0",
            !!isSpeaking && "bg-blue-500 hover:bg-blue-700",
          )}
          onClick={async () => {
            await toggleMic();
          }}
          type="reset"
        >
          <Mic className="h-5 w-5" />
        </Button>
        <div className="flex gap-1">
          <Button
            variant={state.mode === "text" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setState((state) => ({
                ...state,
                mode: "text",
              }));
            }}
          >
            txt
          </Button>

          <Button
            variant={state.mode === "latex" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setState((state) => ({
                ...state,
                mode: "latex",
              }));
            }}
          >
            leTx
          </Button>
        </div>

        <div className="button flex gap-1">
          <Button
            onClick={() => handleSubmit("suggestion")}
            variant={"outline"}
            className="h-10 w-10 p-0 flex-shrink-0"
          >
            <LightbulbIcon className="h-5 w-5" />
          </Button>

          <Button
            onClick={() => handleSubmit("nextStep")}
            variant={"outline"}
            className="h-10 w-10 p-0 flex-shrink-0"
          >
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {state.mode === "text" ? (
        <Input
          onChange={handleChange}
          placeholder="Type your query here."
          className="h-16"
          value={input}
        />
      ) : (
        <div
          className="math-field-container w-full h-max p-2 border rounded-md bg-white"
          ref={(ref) => {
            if (ref && !ref.hasChildNodes()) {
              const mathField = document.createElement("math-field");
              mathField.setAttribute("virtual-keyboard-mode", "off");
              mathField.setAttribute("smart-fence", "true");
              mathField.setAttribute("style", "width: 100%; min-height: 40px;");
              mathField.addEventListener("change", handleChange);

              // Save reference
              mathFieldRef.current = mathField as MathField;

              // Set initial value
              if (input) {
                mathFieldRef.current.setValue(input);
              }

              ref.appendChild(mathField);
            }
          }}
        />
      )}
    </div>
  );
}
