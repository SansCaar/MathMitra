"use client";
import React from "react";
import "katex/dist/katex.css";
import { useAtomValue, useSetAtom } from "jotai";
import TextBoxAtom from "@src/atoms/textBoxAtom";
import { Input } from "@components/ui/input";

export default function TextToLatex() {
  const input = useAtomValue(TextBoxAtom);
  const setInput = useSetAtom(TextBoxAtom);

  const getInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSelect = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const input = e.target as HTMLInputElement;
    // Force the selection to be a single point
    input.setSelectionRange(input.selectionStart, input.selectionStart);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent Ctrl+A selection
    if (e.ctrlKey && e.key === "a") {
      e.preventDefault();
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
    // Prevent double-click selection
    if (e.detail > 1) {
      e.preventDefault();
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const input = e.target as HTMLInputElement;
    input.setSelectionRange(input.selectionStart, input.selectionStart);
  };

  return (
    <>
      {/* <div className="area absolute inset-0 h-full w-full flex items-center"></div>
      <div className="flex items-center px-2">{convertToLatex(input)}</div> */}
      <Input
        type="text"
        /* className="w-full p-2 border rounded text-transparent caret-gray-900 absolute border-none inset-0 active:border-none focus:outline-none select-none" */
        onChange={getInput}
        placeholder="Type your query here."
        value={input}
        /* onSelect={handleSelect}
         onKeyDown={handleKeyDown} 
        /* onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        value={input}
        style={{
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          color: "transparent",
          caretColor: "black",
          textShadow: "none",
          WebkitTextFillColor: "transparent",
          WebkitTouchCallout: "none",
          WebkitTapHighlightColor: "transparent",
          WebkitUserModify: "read-only",
        }} */
      />
      {/* </div> */}
    </>
  );
}
