import { useState, useCallback } from "react";
import _ from "lodash";
import { Col, Row } from "react-bootstrap";
import { RiUploadLine } from "react-icons/ri";
import ChallengeButton from "./ChallengeButton";
import marked from "marked";
import styles from "./MultipleChoiceQuestion.module.scss";
import clsx from "clsx";
import { definitions } from "types/database";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import InstructionText from "./InstructionText";

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

  console.log(`userSelections`);
  console.log(userSelections);

  const onToggle = (optionId) => {
    console.log(`onToggle(optionId=${optionId})`);

    if (userSelections.includes(optionId)) {
      setUserSelections((prevSelections) =>
        prevSelections.filter((id) => id !== optionId)
      );
    } else if (questionData.num_correct_options === 1) {
      setUserSelections([optionId]);
    } else {
      setUserSelections((prevSelections) => [...prevSelections, optionId]);
    }
  };

  return (
    <div className={styles.questionWrapper}>
      <Row className="g-0">
        <Col lg={6}>
          <InstructionText
            labelText="Question"
            textMarkdown={questionData.text_markdown}
          />
        </Col>

        <Col lg={6}>
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
                      __html: marked(o.text_markdown),
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
            <Row>
              <Col>
                <div className={styles.rightControls}>
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
                    label="Check"
                    IconComponent={RiUploadLine}
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
