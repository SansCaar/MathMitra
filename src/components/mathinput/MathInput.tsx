"use client";

import React, { useEffect, useRef } from "react";
import "mathlive";
import { useAtomValue, useSetAtom } from "jotai";
import TextBoxAtom from "@src/atoms/textBoxAtom";
import { Button } from "@components/ui/button";

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

  useEffect(() => {
    if (mathFieldRef.current && input !== mathFieldRef.current.getValue()) {
      mathFieldRef.current.setValue(input);
    }
  }, [input]);

  const handleChange = () => {
    if (mathFieldRef.current) {
      const value = mathFieldRef.current.getValue();
      setInput(value);
    }
  };

  return (
    <div className="math-input-wrapper w-full">
      <div className="toolbar mb-2 flex gap-1 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            mathFieldRef.current?.insert("\\frac{#?}{?}");
            mathFieldRef.current?.focus();
          }}
        >
          a/b
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            mathFieldRef.current?.insert("\\sqrt{#?}");
            mathFieldRef.current?.focus();
          }}
        >
          √
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            mathFieldRef.current?.insert("\\pi");
            mathFieldRef.current?.focus();
          }}
        >
          π
        </Button>
      </div>

      <div
        className="math-field-container w-full min-h-[40px] p-2 border rounded-md bg-white"
        ref={(ref) => {
          if (ref && !ref.hasChildNodes()) {
            const mathField = document.createElement("math-field");
            mathField.setAttribute("virtual-keyboard-mode", "off");
            mathField.setAttribute("smart-fence", "true");
            mathField.setAttribute("style", "width: 100%; min-height: 40px;");
            mathField.addEventListener("input", handleChange);

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
    </div>
  );
}
