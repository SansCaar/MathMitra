"use client";
import React from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.css";

export default function TextToLatex() {
  const [input, setInput] = React.useState("");

  const convertToLatex = (text: string) => {
    // Split the text into parts: math expressions and regular text
    const parts = text.split(
      /(\d+[+\-*/^()\s]+\d+|\w+\^\d+|\w+_\d+|\d+\/\d+|sqrt\([^)]+\))/g
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Math Expression Converter</h1>
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Type your math expression and text (e.g., x^2+5x+6. Please solve it)"
          onChange={getInput}
          value={input}
        />
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Output:</h2>
        <div className="p-4 bg-gray-100 rounded">{convertToLatex(input)}</div>
      </div>
    </div>
  );
}
