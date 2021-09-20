import { useState } from "react";
import _ from "lodash";
import { Col, Row } from "react-bootstrap";
import { RiUploadLine } from "react-icons/ri";
import ChallengeButton from "./ChallengeButton";
import styles from "./MultipleChoiceQuestion.module.scss";
import { definitions } from "types/database";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import InstructionText from "./InstructionText";
import MultipleChoiceOption from "./MultipleChoiceOption";

interface IMultipleChoiceQuestionProps {
  questionData: definitions["multiple_choice_questions"];
  optionsData: definitions["multiple_choice_options"][];
  onSubmit: (userSelectionIds: number[]) => Promise<void>;
}

export default function MultipleChoiceQuestion({
  questionData,
  optionsData,
  onSubmit,
}: IMultipleChoiceQuestionProps) {
  const { user } = useSupabaseAuth();
  const [userSelections, setUserSelections] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    setIsSubmitting(true);

    await onSubmit(userSelections);

    setIsSubmitting(false);
  };

  const onToggle = (optionId) => {
    if (questionData.num_correct_options === 1) {
      if (!userSelections.includes(optionId)) {
        setUserSelections([optionId]);
      }
    } else if (userSelections.includes(optionId)) {
      setUserSelections((prevSelections) =>
        prevSelections.filter((id) => id !== optionId)
      );
    } else {
      setUserSelections((prevSelections) => [...prevSelections, optionId]);
    }
  };

  const getSubmitButtonMessage = () => {
    let submitButtonMessage = "";
    let diff = userSelections.length - questionData.num_correct_options;

    if (diff > 0) {
      submitButtonMessage = `Unselect ${diff} option${
        diff > 1 ? "s" : ""
      } to submit ${"•".repeat(diff)}`;
    } else if (diff < 0) {
      submitButtonMessage = `Select ${-diff} more to submit ${"•".repeat(
        -diff
      )}`;
    } else {
      submitButtonMessage = "Submit";
    }

    return submitButtonMessage;
  };

  return (
    <div className={styles.questionWrapper}>
      <Row className="g-0">
        <Col lg={6} className={styles.equalHeightCol}>
          <div className={styles.instructionsWrapper}>
            <InstructionText
              labelText="Question"
              textMarkdown={questionData.text_markdown}
            />
          </div>
        </Col>

        <Col lg={6} className={styles.equalHeightCol}>
          <div className={styles.optionsWrapper}>
            <span className="label small yellow">
              Select {questionData.num_correct_options}
            </span>

            {optionsData.map((o) => (
              <MultipleChoiceOption
                key={o.id}
                isSelected={userSelections.includes(o.id)}
                disabled={isSubmitting}
                textMarkdown={o.text_markdown}
                onClick={() => onToggle(o.id)}
                showResult={false}
                isCorrectAnswer={true}
              />
            ))}
          </div>
        </Col>
      </Row>

      <Row className="g-0">
        <Col>
          <div className={styles.controlsWrapper}>
            <Row className="g-0">
              <Col>
                <div className={styles.controls}>
                  <ChallengeButton
                    className={styles.button}
                    onClick={submit}
                    tooltip={
                      userSelections.length !== questionData.num_correct_options
                        ? `Select ${
                            questionData.num_correct_options -
                            userSelections.length
                          } more`
                        : `Submit`
                    }
                    disabled={
                      isSubmitting ||
                      userSelections.length !== questionData.num_correct_options
                    }
                    label={getSubmitButtonMessage()}
                    IconComponent={
                      userSelections.length === questionData.num_correct_options
                        ? RiUploadLine
                        : null
                    }
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}
