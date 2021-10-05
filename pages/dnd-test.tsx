import dynamic from "next/dynamic";

const MultipleChoiceOptionsEditor = dynamic(
  () => import("components/challenges/MultipleChoiceOptionsEditor"),
  {
    ssr: false,
  }
);

export default function DnDTestPage() {
  return <MultipleChoiceOptionsEditor />;
}
