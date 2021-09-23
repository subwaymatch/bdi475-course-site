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
import { QueryStatusEnum } from "types";

interface IMultipleChoiceQuestionProps {
  status: QueryStatusEnum;
  questionData: definitions["multiple_choice_questions"];
  optionsData: definitions["multiple_choice_options"][];
  answersData: definitions["multiple_choice_answers"][];
  showResult: boolean;
  onSubmit: (userSelectionIds: number[]) => Promise<void>;
  onReset: () => void;
}

export default function MultipleChoiceQuestion({
  status,
  questionData,
  optionsData,
  answersData,
  showResult,
  onReset,
  onSubmit,
}: IMultipleChoiceQuestionProps) {
  const { user } = useSupabaseAuth();
  const [userSelections, setUserSelections] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLoading = status === QueryStatusEnum.LOADING;

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
    let diff = userSelections.length - questionData?.num_correct_options;

    if (showResult) {
      submitButtonMessage = "Showing result";
    } else if (diff > 0) {
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
              isLoading={isLoading}
              labelText="Question"
              textMarkdown={questionData?.text_markdown}
            />
          </div>
        </Col>

        <Col lg={6} className={styles.equalHeightCol}>
          <div className={styles.optionsWrapper}>
            <span className="label small yellow">
              {isLoading
                ? "Loading Options"
                : `Select ${questionData.num_correct_options}`}
            </span>

            {isLoading
              ? null
              : optionsData.map((o) => (
                  <MultipleChoiceOption
                    key={o.id}
                    isSelected={userSelections.includes(o.id)}
                    disabled={isSubmitting}
                    optionData={o}
                    answerData={answersData.find((a) => a.option_id === o.id)}
                    onClick={() => onToggle(o.id)}
                    showResult={showResult}
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
                      userSelections.length !==
                      questionData?.num_correct_options
                        ? `Select ${
                            questionData?.num_correct_options -
                            userSelections.length
                          } more`
                        : `Submit`
                    }
                    disabled={
                      isLoading ||
                      userSelections.length !==
                        questionData?.num_correct_options ||
                      isSubmitting ||
                      showResult
                    }
                    label={getSubmitButtonMessage()}
                    IconComponent={
                      userSelections.length ===
                      questionData?.num_correct_options
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
