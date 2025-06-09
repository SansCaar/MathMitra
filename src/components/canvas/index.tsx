"use client";

import { Editor, FillStyle, Shape, Text } from "@dgmjs/core";
import { DGMEditor, DGMEditorProps } from "@dgmjs/react";
import { useState } from "react";
import { Toolbar } from "./toolbar";
import { cn } from "@src/utils/cn";
import { CanvasAtom } from "@src/atoms/CanvasAtom";
import { useAtomValue, useSetAtom } from "jotai";
import TitleSection from "./title-section";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    editor: Editor;
  }
}

function Canvas({
  className,
  ...props
}: DGMEditorProps & {
  playgroundId: string;
}) {
  const editor = useAtomValue(CanvasAtom);
  const setEditor = useSetAtom(CanvasAtom);
  const router = useRouter();

  const [activeHandler, setActiveHandler] = useState<string>("Freehand");

  const handleMount = async (editor: Editor) => {
    window.editor = editor;
    setEditor(editor);
    editor.newDoc();
    editor.fitToScreen();
    editor.activateHandler("Freehand");
    window.addEventListener("resize", () => {
      editor.fit();
    });
  };

  const handleShapeInitialize = (shape: Shape) => {
    shape.fillStyle =
      shape instanceof Text ? FillStyle.NONE : FillStyle.HACHURE;
    shape.fillColor = "$green6";
    shape.fontFamily = "Gloria Hallelujah";
    shape.fontSize = 20;
    shape.roughness = 1;
  };

  return (
    <div className={cn("border  relative", className)}>
      <TitleSection />
      <DGMEditor
        className="h-full w-full rounded-md"
        onMount={handleMount}
        onShapeInitialize={handleShapeInitialize}
        onActiveHandlerChange={(handler) => setActiveHandler(handler)}
        {...props}
      />
      <Toolbar
        editor={editor}
        activeHandler={activeHandler}
        onActiveHandlerChange={(handler) =>
          window.editor.activateHandler(handler)
        }
      />
    </div>
  );
}

export default Canvas;
