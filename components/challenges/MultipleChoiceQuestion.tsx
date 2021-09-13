import { useState, useEffect, useCallback } from "react";
import _ from "lodash";
import { largeDesktop } from "constants/media-query-strings";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useLocalStorage from "hooks/useLocalStorage";
import { Col, Row } from "react-bootstrap";
import { BiReset } from "react-icons/bi";
import { IoColorWandOutline } from "react-icons/io5";
import { VscSymbolMethod, VscRunAll } from "react-icons/vsc";
import { IoPlay } from "react-icons/io5";
import Tippy from "@tippyjs/react";
import { toast } from "react-toastify";
import marked from "marked";
import styles from "./MultipleChoiceQuestion.module.scss";
import clsx from "clsx";
import { definitions } from "types/database";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import InstructionText from "./InstructionText";

interface IMultipleChoiceQuestionProps {
  localStorageKey?: string;
  questionData: definitions["multiple_choice_questions"];
  optionsData: definitions["multiple_choice_options"][];
  onSubmit: (boolean, string?) => void;
}

export default function MultipleChoiceQuestion({
  localStorageKey,
  questionData,
  optionsData,
  onSubmit,
}: IMultipleChoiceQuestionProps) {
  const { user } = useSupabaseAuth();
  const [userSelections, setUserSelections] = useState<number[]>([]);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isScreenLargeDesktop = useMediaQuery(largeDesktop);
  const [savedUserSelections, setSavedUserSelections] = useLocalStorage<
    number[]
  >(localStorageKey, userSelections);

  useEffect(() => {
    // Load user code from LocalStorage if key exists
    if (localStorageKey && savedUserSelections) {
      setUserSelections(savedUserSelections);
    }
  }, []);

  const reset = async () => {
    setUserSelections([]);
    setHasError(false);
    setErrorMessage("");
    toast("Reset Complete!");
  };

  const saveUserSelectionsToLocalStorage = useCallback(
    _.debounce((updatedSelections) => {
      setSavedUserSelections(updatedSelections);
    }, 1000),
    []
  );

  const onChange = (newUserCode) => {
    setUserSelections(newUserCode);

    if (localStorageKey) {
      saveUserSelectionsToLocalStorage(newUserCode);
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
            <span className="label yellow">Select 1</span>

            {optionsData.map((o) => (
              <div
                key={o.id}
                className={styles.optionMarkdown}
                dangerouslySetInnerHTML={{
                  __html: marked(o.text_markdown),
                }}
              />
            ))}
          </div>
        </Col>
      </Row>

      <Row className="g-0">
        <Col>
          <div className={styles.controlsWrapper}>
            <Row>
              <Col>
                <div className={styles.leftControls}>
                  <div
                    className={clsx(styles.button, styles.reset)}
                    onClick={(e) => {
                      if (
                        window.confirm(
                          "Do you really want to reset your selections?"
                        )
                      ) {
                        reset();
                      }
                    }}
                  >
                    <BiReset className={styles.reactIcon} />
                    <span className={styles.label}>Reset</span>
                  </div>
                </div>
              </Col>

              <Col>
                <div className={styles.rightControls}>
                  <Tippy
                    content={<>Submit your selection(s)</>}
                    className="tippy"
                    placement="bottom"
                    offset={[0, -4]}
                    theme="light"
                    disabled={!isScreenLargeDesktop}
                  >
                    <div
                      className={clsx(styles.button, styles.checkButton)}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <VscRunAll className={styles.reactIcon} />
                      <span className={styles.label}>Submit</span>
                    </div>
                  </Tippy>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}
