import clsx from "clsx";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import useChallenges from "hooks/useChallenges";
import styles from "./ChallengesProgressDisplay.module.scss";
import { roundToTwoDecimals } from "utils/format-strings";
import { useEffect, useState } from "react";
import { RiTrophyLine } from "react-icons/ri";
import { ImCheckmark } from "react-icons/im";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Link from "next/link";
import ChallengeResultsModal from "components/challenges/view/ChallengeResultsModal";
import { isMobile } from "react-device-detect";
import Tippy from "@tippyjs/react";

export default function ChallengesProgressDisplay() {
  const { user } = useSupabaseAuth();
  const { challenges, challengeResults } = useChallenges();
  const resultSummary = challengeResults?.reduce(
    (prevResult, currResult) => ({
      num_success:
        prevResult.num_success + Number(currResult.success_count > 0),
      num_challenges: prevResult.num_challenges + 1,
    }),
    { num_success: 0, num_challenges: 0 }
  );
  const [p, setP] = useState<number>(0);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    if (challenges.length > 0 && resultSummary) {
      setP((resultSummary.num_success / resultSummary.num_challenges) * 100);
    }
  }, [resultSummary]);

  if (challenges.length === 0) {
    return null;
  }

  if (!user) {
    return (
      <div className={styles.bottomBar}>
        <div className={styles.progressDisplay}>
          <Link href="/login">
            <a className={styles.signInLink}>
              <AccountCircleOutlinedIcon className={styles.icon} />
              Sign in to record your challenge submissions
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return user && resultSummary ? (
    <>
      <div className={styles.bottomBar}>
        <Tippy
          content="Click to view details"
          className="tippy"
          placement="top"
          offset={[0, 4]}
          theme="light"
          disabled={isMobile}
        >
          <div
            className={clsx(styles.progressDisplay, {
              [styles.beforeStart]: p === 0,
              [styles.inProgress]: p > 0 && p < 100,
              [styles.complete]: p === 100,
            })}
            onClick={() => setIsDetailModalOpen(true)}
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
              {p < 100 && (
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
            <div className={clsx(styles.percentage)}>
              {roundToTwoDecimals(p)}%
            </div>
          </div>
        </Tippy>
      </div>

      <ChallengeResultsModal
        challenges={challenges}
        userId={user.id}
        isOpen={isDetailModalOpen}
        handleClose={() => {
          setIsDetailModalOpen(false);
        }}
      />
    </>
  ) : null;
}
