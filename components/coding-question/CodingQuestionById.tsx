import CodingQuestion from "components/coding-question/CodingQuestion";
import { useFirestoreDocDataOnce, useFirestore } from "reactfire";

interface ICodingQuestionByIdProps {
  qid: string;
  onSubmit: (isSuccess: boolean, qid?: string) => void;
  wrapperClassName?: string;
}

export default function CodingQuestionById({
  qid,
  onSubmit,
  wrapperClassName,
}: ICodingQuestionByIdProps) {
  const firestore = useFirestore();
  const questionDocRef = firestore.collection("codingQuestions").doc(qid);
  const { status, data } = useFirestoreDocDataOnce(questionDocRef);

  // Provide qid as second argument for convenience
  const onSubmitWithId = (isSuccess) => onSubmit(isSuccess, qid);

  return (status as any) === "loading" ? (
    <>"Loading..."</>
  ) : (
    <div className={wrapperClassName ? wrapperClassName : ""}>
      <CodingQuestion
        title={(data as any).title}
        textMarkdown={(data as any).textMarkdown}
        starterCode={(data as any).starterCode}
        testCode={(data as any).testCode}
        onSubmit={onSubmitWithId}
      />
    </div>
  );
}
