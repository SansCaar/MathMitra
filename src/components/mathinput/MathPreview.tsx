"use client";

import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathPreviewProps {
  latex: string;
}

export default function MathPreview({ latex }: MathPreviewProps) {
  if (!latex) {
    return null;
  }

  try {
    const html = katex.renderToString(latex, {
      throwOnError: false,
      displayMode: true,
      strict: false
    });

    return (
      <div className="mt-2 p-2 border rounded bg-gray-50 dark:bg-gray-900">
        <div 
          className="flex items-center justify-center" 
          dangerouslySetInnerHTML={{ __html: html }} 
        />
      </div>
    );
  } catch (error) {
    // If KaTeX fails to render, just return the raw LaTeX
    return (
      <div className="mt-2 p-2 border rounded bg-gray-50 dark:bg-gray-900">
        <code>{latex}</code>
      </div>
    );
  }
}
