import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { definitions } from "types/database";
import { TextareaAutosize } from "@material-ui/core";
import { DragHandle } from "components/ui/DragHandle";
import styles from "./MultipleChoiceEditor.module.scss";
import { RiDeleteBin2Line } from "react-icons/ri";

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

  console.log(`transform=${transform}, transition=${transition}`);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      className={styles.optionItemEditor}
      style={style}
      {...attributes}
    >
      <TextareaAutosize
        className={styles.optionTextarea}
        value={optionData.text_markdown}
        onChange={(e) => updateTextMarkdown(e.target.value)}
      />

      <DragHandle {...listeners} />

      <div
        className={styles.deleteButton}
        onClick={(e) => {
          console.log("on Delete click");
          onDelete();
        }}
      >
        <RiDeleteBin2Line className={styles.reactIcon} />
      </div>
    </div>
  );
}
