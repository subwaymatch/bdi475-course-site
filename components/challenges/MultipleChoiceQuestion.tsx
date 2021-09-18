import { useState } from "react";
import _ from "lodash";
import { Col, Row } from "react-bootstrap";
import { RiUploadLine } from "react-icons/ri";
import ChallengeButton from "./ChallengeButton";
import styles from "./MultipleChoiceQuestion.module.scss";
import clsx from "clsx";
import { definitions } from "types/database";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import InstructionText from "./InstructionText";
import parseMarkdown from "lib/unified";

interface IMultipleChoiceQuestionProps {
  questionData: definitions["multiple_choice_questions"];
  optionsData: definitions["multiple_choice_options"][];
  onSubmit: (boolean, string?) => void;
}

export default function MultipleChoiceQuestion({
  questionData,
  optionsData,
  onSubmit,
}: IMultipleChoiceQuestionProps) {
  const { user } = useSupabaseAuth();
  const [userSelections, setUserSelections] = useState<number[]>([]);

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

            {optionsData.map((o) => {
              const isSelected = userSelections.includes(o.id);

              return (
                <div
                  className={clsx(styles.optionItem, {
                    [styles.isSelected]: isSelected,
                  })}
                  onClick={() => onToggle(o.id)}
                  key={o.id}
                >
                  <div className={styles.optionCheckbox}>
                    {isSelected && <span>→</span>}
                  </div>

                  <div
                    className={styles.optionMarkdown}
                    dangerouslySetInnerHTML={{
                      __html: parseMarkdown(o.text_markdown),
                    }}
                  />
                </div>
              );
            })}
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
                    onClick={async () => {
                      // Do nothing
                      console.log(`Check`);
                    }}
                    tooltip={
                      userSelections.length !== questionData.num_correct_options
                        ? `Select ${
                            questionData.num_correct_options -
                            userSelections.length
                          } more`
                        : `Submit`
                    }
                    disabled={
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
