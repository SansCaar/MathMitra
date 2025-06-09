"use client";

import React from 'react';
import { Button } from "@components/ui/button";

interface MathToolbarProps {
  onInsertSymbol: (symbol: string) => void;
}

const commonSymbols = [
  { label: 'π', value: '\\pi' },
  { label: '√', value: '\\sqrt{#?}' },
  { label: '^', value: '^{#?}' },
  { label: '∫', value: '\\int_{#?}^{?}' },
  { label: '∑', value: '\\sum_{#?}^{?}' },
  { label: '≈', value: '\\approx' },
  { label: '≠', value: '\\ne' },
  { label: '≤', value: '\\le' },
  { label: '≥', value: '\\ge' },
  { label: 'θ', value: '\\theta' },
  { label: 'α', value: '\\alpha' },
  { label: '∞', value: '\\infty' },
  { label: 'Δ', value: '\\Delta' },
  { label: '×', value: '\\times' },
  { label: '÷', value: '\\div' }
];

export default function MathToolbar({ onInsertSymbol }: MathToolbarProps) {
  return (
    <div className="flex flex-wrap gap-1 mb-1">
      {commonSymbols.map((symbol) => (
        <Button
          key={symbol.value}
          variant="outline"
          size="sm"
          className="px-2 py-0 h-7 min-w-7"
          onClick={() => onInsertSymbol(symbol.value)}
        >
          {symbol.label}
        </Button>
      ))}
      <Button
        variant="outline"
        size="sm"
        className="px-2 py-0 h-7"
        onClick={() => onInsertSymbol('\\frac{#?}{?}')}
      >
        a/b
      </Button>
    </div>
  );
}
