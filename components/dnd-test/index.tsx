import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import SortableExample from "./SortableExample";

export default function Dndtest() {
  const conatiners = ["A", "B", "C"];
  const [parent, setParent] = useState(null);
  const draggableMarkup = <Draggable id="draggable">Drag Me</Draggable>;

  function handleDragEnd(event) {
    const { over } = event;

    setParent(over ? over.id : null);
  }

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        {parent === null ? draggableMarkup : null}

        {conatiners.map((id) => (
          <Droppable key={id} id={id}>
            {parent === id ? draggableMarkup : "Drop here"}
          </Droppable>
        ))}
      </DndContext>

      <SortableExample />
    </>
  );
}
