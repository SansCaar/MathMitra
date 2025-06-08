"use client";

import { Editor, FillStyle, Shape, Text, type ShapeProps } from "@dgmjs/core";
import { DGMEditor, DGMEditorProps } from "@dgmjs/react";
import { useState } from "react";
import { Toolbar } from "./toolbar";
import { Palette } from "./pallete";
import { cn } from "@src/utils/cn";

declare global {
  interface Window {
    editor: Editor;
  }
}

function Canvas({ className, ...props }: DGMEditorProps) {
  const [editor, setEditor] = useState<Editor | null>(null);
  const [activeHandler, setActiveHandler] = useState<string>("Select");

  const handleMount = async (editor: Editor) => {
    window.editor = editor;
    setEditor(editor);
    editor.newDoc();
    editor.fitToScreen();
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

  const handlePropsChange = (props: ShapeProps) => {
    window.editor.actions.update(props);
  };

  return (
    <div className={cn("border  relative", className)}>
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
      <Palette onPropsChange={handlePropsChange} />
    </div>
  );
}

export default Canvas;
