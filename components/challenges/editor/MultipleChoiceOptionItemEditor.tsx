import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { definitions } from "types/database";
import { TextareaAutosize } from "@material-ui/core";
import { DragHandle } from "components/ui/DragHandle";

export interface IMultipleChoiceOptionItemEditorProps {
  id: string;
  optionData: definitions["multiple_choice_options"];
  onDelete: () => void;
  updateTextMarkdown: (v: string) => void;
}

export default function MultipleChoiceOptionItemEditor({
  id,
  optionData,
  onDelete,
  updateTextMarkdown,
}: IMultipleChoiceOptionItemEditorProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: "flex",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <TextareaAutosize
        value={optionData.text_markdown}
        onChange={(e) => updateTextMarkdown(e.target.value)}
      />

      <DragHandle {...listeners} />

      <div
        onClick={(e) => {
          console.log("on Delete click");
          onDelete();
        }}
      >
        Delete
      </div>
    </div>
  );
}
