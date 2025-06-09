import { InlineMath } from "react-katex";
import "katex/dist/katex.css";

export const convertToLatex = (text: string) => {
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

