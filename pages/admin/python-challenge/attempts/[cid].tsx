import { useRouter } from "next/router";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import Highlighter from "components/code-blocks/Highlighter";
import styles from "styles/pages/python-challenge/history.module.scss";
import clsx from "clsx";
import { IoCopyOutline } from "react-icons/io5";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Tippy from "@tippyjs/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import { supabaseClient } from "lib/supabase/supabaseClient";
import { definitions } from "types/database";
import { useUser } from "context/UserContext";

dayjs.extend(relativeTime);

export default function CodingChallengeAttemptsPage() {
  const router = useRouter();
  const { cid } = router.query;
  const { user, roles } = useUser();
  const [attempts, setAttempts] = useState([]);

  const getAttempts = async () => {
    const challengeId = Array.isArray(cid) ? Number(cid[0]) : Number(cid);

    const { data, error } = await supabaseClient
      .from<definitions["coding_challenge_attempts"]>(
        "coding_challenge_attempts"
      )
      .select(
        `
        submitted_at,
        is_success,
        user_code,
        profiles (
          display_name
        )
      `
      )
      .match({
        challenge_id: challengeId,
      })
      .order("submitted_at", { ascending: false })
      .limit(100);

    setAttempts(data);

    if (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!cid) {
      return;
    }

    getAttempts();

    const newAttemptSubscription = supabaseClient
      .from<definitions["coding_challenge_attempts"]>(
        `coding_challenge_attempts:challenge_id=eq.${cid}`
      )
      .on("INSERT", async (payload) => {
        console.log("Change received!", payload);
        const newData = payload.new;
        const { data: profileData, error: profileError } = await supabaseClient
          .from<definitions["profiles"]>("profiles")
          .select("display_name")
          .eq("id", newData.user_id)
          .single();

        const newAttempt = {
          submitted_at: newData.submitted_at,
          is_success: newData.is_success,
          user_code: newData.user_code,
          profiles: {
            display_name: profileData.display_name,
          },
        };

        setAttempts((attempts) => {
          return [newAttempt, ...attempts];
        });
      })
      .subscribe();

    return () => {
      supabaseClient.removeSubscription(newAttemptSubscription);
    };
  }, [cid]);

  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h2 className="sectionTitle">
                Question Attempts
                <span className="accent blue" />
              </h2>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className={styles.attempts}>
                {attempts.map((o, index) => (
                  <div key={index} className={styles.item}>
                    <Row>
                      <Col md={2} xs={6}>
                        <div className={styles.result}>
                          <span
                            className={clsx(
                              "label",
                              o.is_success ? "green" : "pink"
                            )}
                          >
                            Result
                          </span>

                          <div className={styles.text}>
                            {o.is_success ? (
                              <>
                                Pass
                                <HiOutlineBadgeCheck
                                  className={clsx(
                                    styles.reactIcon,
                                    styles.pass
                                  )}
                                />
                              </>
                            ) : (
                              <>
                                Fail
                                <IoIosCloseCircleOutline
                                  className={clsx(
                                    styles.reactIcon,
                                    styles.fail
                                  )}
                                />
                              </>
                            )}
                          </div>
                        </div>
                      </Col>

                      <Col md={2} xs={6}>
                        {o.submitted_at && (
                          <div className={styles.timestamp}>
                            <span className="label yellow">Submitted</span>

                            <div className={styles.text}>
                              <Tippy
                                content={dayjs(o.submitted_at).format(
                                  "YYYY-MM-DD HH:mm:ss A"
                                )}
                                className="tippy"
                                placement="bottom"
                                theme="light"
                              >
                                <span>{dayjs(o.submitted_at).fromNow()}</span>
                              </Tippy>
                            </div>
                          </div>
                        )}
                      </Col>

                      <Col md={8}>
                        <div className={styles.codeWrapper}>
                          <div className={styles.labelWrapper}>
                            <span className="label blue">Code</span>
                            <span
                              className={clsx(
                                "label",
                                "purple",
                                styles.displayName
                              )}
                            >
                              {o.profiles.display_name}
                            </span>

                            <CopyToClipboard
                              text={o.user_code}
                              onCopy={() =>
                                toast.info(<div>Copied to clipboard</div>)
                              }
                            >
                              <span className={styles.iconButton}>
                                <IoCopyOutline className={styles.reactIcon} />
                              </span>
                            </CopyToClipboard>

                            <Tippy
                              content="Copy to Clipboard"
                              className="tippy"
                              placement="bottom"
                              theme="light"
                            />
                          </div>
                          <Highlighter
                            content={o.user_code}
                            language="python"
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}