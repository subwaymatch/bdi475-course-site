import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { definitions } from "types/database";
import { TextareaAutosize } from "@material-ui/core";

export interface IMultipleChoiceOptionItemEditorProps {
  id: string;
  optionData: definitions["multiple_choice_options"];
  updateTextMarkdown: (v: string) => void;
}

export default function MultipleChoiceOptionItemEditor({
  id,
  optionData,
  updateTextMarkdown,
}: IMultipleChoiceOptionItemEditorProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TextareaAutosize
        value={optionData.text_markdown}
        onChange={(e) => updateTextMarkdown(e.target.value)}
      />

      <div>D</div>
    </div>
  );
}
