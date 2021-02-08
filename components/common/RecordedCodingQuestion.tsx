import { useState, useEffect } from "react";
import CodingQuestion from "components/coding-question/CodingQuestion";
import firebase from "firebase/app";
import { ICodingQuestionAttempt } from "typings/coding-question";
import { useFirestoreDocData, useFirestore } from "reactfire";
import useFirebaseAuth from "hooks/useFirebaseAuth";
import { Row, Col } from "react-bootstrap";
import useCodingQuestion from "hooks/useCodingQuestion";

interface IRecordedCodingQuestionProps {
  qid: string;
  className?: string;
}

export default function RecordedCodingQuestion({
  qid,
  className,
}: IRecordedCodingQuestionProps) {
  const { user } = useFirebaseAuth();
  const firestore = useFirestore();
  const { status, data, error } = useCodingQuestion(qid);
  const [attempts, setAttempts] = useState<ICodingQuestionAttempt[]>([]);
  // const userAttemptsDoc = firestore.collection("userAttempts").doc(qid);
  // const { status: attemptsStatus, data: attemptsData } = useFirestoreDocData(
  //   userAttemptsDoc
  // );

  const recordSubmission = async (isSuccess: boolean, userCode: string) => {
    if (!user) return;

    try {
      const token = await user.getIdToken();
      const options = {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isSuccess,
          userCode,
        }),
      };

      const res = await fetch(`/api/coding-question/attempt/${qid}`, options);
      const data = await res.json();
    } catch (err) {
      console.error(err);
    }
  };

  // const onSubmit = async (isSuccess: boolean, userCode: string) => {
  //   if (user) {
  //     const uid = user.uid;

  //     try {
  //       await userAttemptsDoc.set(
  //         {
  //           [uid]: firebase.firestore.FieldValue.arrayUnion({
  //             isSuccess,
  //             userCode,
  //             submittedAt: firebase.firestore.Timestamp.now(),
  //           }),
  //         },
  //         {
  //           merge: true,
  //         }
  //       );
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  // };

  return status === "success" ? (
    <Row>
      <Col>
        <div className={className ? className : ""}>
          <CodingQuestion
            title={(data as any).title}
            textMarkdown={(data as any).textMarkdown}
            starterCode={(data as any).starterCode}
            testCode={(data as any).testCode}
            editLink={`/coding-question/edit/${qid}`}
            onSubmit={recordSubmission}
          />
        </div>
      </Col>
    </Row>
  ) : (
    <Row>
      <Col>
        <p>{status === "error" ? error : "Loading..."}</p>
      </Col>
    </Row>
  );
}
