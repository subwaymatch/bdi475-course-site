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
import {
  restrictToVerticalAxis,
  restrictToFirstScrollableAncestor,
} from "@dnd-kit/modifiers";
import MultipleChoiceOptionItemEditor from "./MultipleChoiceOptionItemEditor";
import { definitions } from "types/database";
import styles from "./MultipleChoiceEditor.module.scss";
import cloneDeep from "lodash/cloneDeep";
import sortBy from "lodash/sortBy";
import { useCounter } from "react-use";

export interface IMultipleChoiceOptionsEditorProps {
  questionData: definitions["multiple_choice_questions"];
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
  questionData,
  optionsData,
  setOptionsData,
}: IMultipleChoiceOptionsEditorProps) {
  const sortedOptionsData: Array<definitions["multiple_choice_options"]> =
    sortBy(optionsData, "order");
  const items: Array<IOptionItem> = sortedOptionsData.map((o) => ({
    id: o.id.toString(),
    optionData: o,
  }));

  // a counter of new option id
  // negative values are used to indicate that the new items
  // haven't been saved to the database yet
  const [newOptionId, { dec }] = useCounter(-1);

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
    const clonedOptions = cloneDeep(optionsData.filter((o) => o.id !== id));

    setOptionsData(clonedOptions);
  };

  const addNewOptionItem = () => {
    const clonedOptions = cloneDeep(optionsData);
    const newOptionItem: definitions["multiple_choice_options"] = {
      id: newOptionId,
      question_id: questionData.id,
      is_correct: false,
      text_markdown: "",
      explanation_markdown: "",
      order: clonedOptions.length,
    };

    dec();

    clonedOptions.push(newOptionItem);

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
    <div className={styles.optionsEditor}>
      <div className={styles.optionItemsWrapper}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[
            restrictToVerticalAxis,
            restrictToFirstScrollableAncestor,
          ]}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((item) => (
              <MultipleChoiceOptionItemEditor
                key={item.id}
                id={item.id}
                optionData={item.optionData}
                onDelete={() => markForDeletion(item.optionData.id)}
                updateField={(fieldName, value) =>
                  updateOptionsData(item.optionData.id, fieldName, value)
                }
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <div className={styles.addOptionButton} onClick={addNewOptionItem}>
        Add Option
      </div>
    </div>
  );
}
