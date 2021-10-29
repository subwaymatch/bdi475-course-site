import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import MultipleChoiceOptionItemEditor from "./MultipleChoiceOptionItemEditor";
import { definitions } from "types/database";
import cloneDeep from "lodash/cloneDeep";
import sortBy from "lodash/sortBy";

export interface IMultipleChoiceOptionsEditorProps {
  optionsData: Array<definitions["multiple_choice_options"]>;
  setOptionsData: (
    options: Array<definitions["multiple_choice_options"]>
  ) => void;
}

export interface IOptionItem {
  id: string;
  optionData: definitions["multiple_choice_options"];
}

export default function MultipleChoiceOptionsEditor({
  optionsData,
  setOptionsData,
}: IMultipleChoiceOptionsEditorProps) {
  const sortedOptionsData: Array<definitions["multiple_choice_options"]> =
    sortBy(optionsData, "order");
  const items: Array<IOptionItem> = sortedOptionsData.map((o) => ({
    id: o.id.toString(),
    optionData: o,
  }));

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const updateOptionsData = (optionId, key, val) => {
    const newOptions = cloneDeep(optionsData).map((o) => {
      if (o.id === optionId) {
        o[key] = val;
      }

      return o;
    });

    setOptionsData(newOptions);
  };

  const markForDeletion = (id) => {
    console.log(`markForDeletion id=${id}`);

    const clonedOptions = cloneDeep(optionsData.filter((o) => o.id !== id));

    setOptionsData(clonedOptions);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((o) => active.id === o.id);
      const newIndex = items.findIndex((o) => over.id === o.id);

      const newArray = arrayMove(items, oldIndex, newIndex);

      newArray.forEach((o, index) => {
        o.optionData = cloneDeep(o.optionData);
        o.optionData.order = index;
      });

      setOptionsData(newArray.map((x) => x.optionData));
    }
  };

  return (
    <div
      style={{
        height: "100%",
        background: "yellow",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ flex: 1, overflowY: "auto" }}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((item) => (
              <MultipleChoiceOptionItemEditor
                key={item.id}
                id={item.id}
                optionData={item.optionData}
                onDelete={() => markForDeletion(item.optionData.id)}
                updateTextMarkdown={(v) => {
                  updateOptionsData(item.optionData.id, "text_markdown", v);
                }}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          background: "#aaa",
          padding: "8px 16px",
        }}
      >
        Add Option
      </div>
    </div>
  );
}
