"use client";
import React, { useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.css";
import { useAtomValue, useSetAtom } from "jotai";
import TextBoxAtom from "@src/atoms/textBoxAtom";

export default function TextToLatex() {
  const input = useAtomValue(TextBoxAtom);
  const setInput = useSetAtom(TextBoxAtom);

  const convertToLatex = (text: string) => {
    // Split the text into parts: math expressions and regular text
    const parts = text.split(
      /(\d+[+\-*/^()\s]+\d+|\w+\^\d+|\w+_\d+|\d+\/\d+|sqrt\([^)]+\))/g,
    );

    return parts.map((part, index) => {
      // Check if the part is a mathematical expression
      if (
        part.match(/^[\d+\-*/^()\s]+$/) ||
        part.match(/^\w+\^\d+$/) ||
        part.match(/^\w+_\d+$/) ||
        part.match(/^\d+\/\d+$/) ||
        part.match(/^sqrt\([^)]+\)$/)
      ) {
        // Convert math expressions to LaTeX
        let latexText = part
          .replace(/(\w+)\^(\d+)/g, "{$1^{$2}}")
          .replace(/(\w+)_(\d+)/g, "{$1_{$2}}")
          .replace(/(\d+)\/(\d+)/g, "\\frac{$1}{$2}")
          .replace(/sqrt\(([^)]+)\)/g, "\\sqrt{$1}")
          .replace(/\*/g, "\\cdot ")
          .replace(/\+/g, " + ")
          .replace(/-/g, " - ");

        return <InlineMath key={index}>{latexText}</InlineMath>;
      } else {
        // Return regular text as is
        return <span key={index}>{part}</span>;
      }
    });
  };

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
    <div className="border-1 border-gray-400 h-10 w-full relative flex items-center">
      {/* <div className="area absolute inset-0 h-full w-full flex items-center"></div>
      <div className="flex items-center px-2">{convertToLatex(input)}</div> */}
      <input
        type="text"
        /* className="w-full p-2 border rounded text-transparent caret-gray-900 absolute border-none inset-0 active:border-none focus:outline-none select-none" */
        className="h-full w-full border-gray-300 rounded-md"
        onChange={getInput}
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
    </div>
  );
}
