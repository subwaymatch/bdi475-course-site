import clsx from "clsx";
import useChallenges from "hooks/useChallenges";
import styles from "./ChallengesProgressDisplay.module.scss";
import { roundToTwoDecimals } from "utils/format-strings";
import { useEffect, useState } from "react";
import { RiTrophyLine } from "react-icons/ri";
import { ImCheckmark } from "react-icons/im";

export default function ChallengesProgressDisplay() {
  const { challengeResults } = useChallenges();
  const resultSummary = challengeResults?.reduce(
    (prevResult, currResult) => ({
      num_success:
        prevResult.num_success + Number(currResult.success_count > 0),
      num_challenges: prevResult.num_challenges + 1,
    }),
    { num_success: 0, num_challenges: 0 }
  );
  const [p, setP] = useState<number>(0);

  useEffect(() => {
    if (resultSummary) {
      setP(
        resultSummary.num_challenges === 0
          ? 100
          : (resultSummary.num_success / resultSummary.num_challenges) * 100
      );
    }
  }, [resultSummary]);

  return resultSummary ? (
    <div className={styles.bottomBar}>
      <div
        className={clsx(styles.progressDisplay, {
          [styles.beforeStart]: p === 0,
          [styles.inProgress]: p > 0 && p < 100,
          [styles.complete]: p === 100,
        })}
      >
        {p < 100 && (
          <RiTrophyLine
            className={clsx(styles.progressIcon, styles.reactIcon)}
          />
        )}
        {p === 100 && (
          <ImCheckmark
            className={clsx(styles.progressIcon, styles.reactIcon)}
          />
        )}

        <div className={clsx(styles.count)}>
          {p === 0 && "Challenges"}
          {p > 0 && p < 100 && (
            <>
              {resultSummary.num_success}
              <span className={styles.divider}>/</span>
              {resultSummary.num_challenges} Completed
            </>
          )}
          {p === 100 && "Complete"}
        </div>
        <div className={clsx(styles.progressWrapper)}>
          <div className={styles.progressOuter}>
            <div
              className={styles.progressBar}
              style={{
                width: `${p}%`,
              }}
            />
          </div>
        </div>
        <div className={clsx(styles.percentage)}>{roundToTwoDecimals(p)}%</div>
      </div>
    </div>
  ) : null;
}
