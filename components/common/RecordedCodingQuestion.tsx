import { useState, useEffect } from "react";
import CodingQuestion from "components/coding-question/CodingQuestion";
import firebase from "firebase/app";
import { useFirestoreDocDataOnce, useFirestore } from "reactfire";
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
  const firestore = useFirestore();
  const questionDocRef = firestore.collection("codingQuestions").doc(qid);
  const { user } = useFirebaseAuth();
  const { status, data, error } = useCodingQuestion(qid);

  console.log(`user in Recorded question`);
  console.log(user);

  const onSubmit = async (isSuccess: boolean) => {
    if (user) {
      const userAttemptsDoc = firestore.collection("userAttempts").doc(qid);
      const uid = user.uid;

      try {
        await userAttemptsDoc.set(
          {
            [uid]: firebase.firestore.FieldValue.arrayUnion({
              isSuccess,
              // Handle timestamp recording in the server
              timestamp: firebase.firestore.Timestamp.now(),
            }),
          },
          {
            merge: true,
          }
        );
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (status as string) === "loading" ? (
    <>"Loading..."</>
  ) : (
    <Row>
      <Col>
        {JSON.stringify(data)}
        {/* <div className={className ? className : ""}>
           <CodingQuestion
             title={(data as any).title}
             textMarkdown={(data as any).textMarkdown}
             starterCode={(data as any).starterCode}
             testCode={(data as any).testCode}
             onSubmit={onSubmit}
           />
         </div> */}
      </Col>
    </Row>
  );
}
