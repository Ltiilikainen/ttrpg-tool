"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const TipTapEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
    parseOptions: {
      preserveWhitespace: "full",
    },
  });

  return <EditorContent editor={editor} />;
};

export default TipTapEditor;
