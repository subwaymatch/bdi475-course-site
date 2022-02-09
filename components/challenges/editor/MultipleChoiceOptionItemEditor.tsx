import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { definitions } from "types/database";
import Checkbox from "@mui/material/Checkbox";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { DragHandle } from "components/ui/DragHandle";
import clsx from "clsx";
import styles from "./MultipleChoiceEditor.module.scss";
import { RiDeleteBin2Line } from "react-icons/ri";
import { BsParagraph } from "react-icons/bs";

export interface IMultipleChoiceOptionItemEditorProps {
  id: string;
  optionData: definitions["multiple_choice_options"];
  onDelete: () => void;
  updateField: (fieldName: string, v: any) => void;
}

export default function MultipleChoiceOptionItemEditor({
  id,
  optionData,
  onDelete,
  updateField,
}: IMultipleChoiceOptionItemEditorProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

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
      <div className={styles.checkboxWrapper}>
        <Checkbox
          checked={optionData.is_correct}
          onChange={(e) => updateField("is_correct", e.target.checked)}
          inputProps={{ "aria-label": "controlled" }}
          color="default"
        />
      </div>

      <div className={styles.stackedTextareasWrapper}>
        <div className={styles.textareaWrapper}>
          <span
            className={clsx(styles.textareaLabel, styles.textMarkdownLabel)}
          >
            Text
          </span>

          <TextareaAutosize
            className={clsx(styles.textarea, styles.text)}
            value={optionData.text_markdown}
            onChange={(e) => updateField("text_markdown", e.target.value)}
          />
        </div>

        <div className={styles.textareaWrapper}>
          <span
            className={clsx(
              styles.textareaLabel,
              styles.explanationMarkdownLabel
            )}
          >
            Explanation
          </span>

          <TextareaAutosize
            className={clsx(styles.textarea, styles.explanation)}
            value={optionData.explanation_markdown}
            onChange={(e) =>
              updateField("explanation_markdown", e.target.value)
            }
          />
        </div>
      </div>

      <DragHandle {...listeners} />

      <div
        className={styles.deleteButton}
        onClick={(e) => {
          onDelete();
        }}
      >
        <RiDeleteBin2Line className={styles.reactIcon} />
      </div>
    </div>
  );
}
