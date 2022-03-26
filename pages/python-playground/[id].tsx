import Layout from "components/Layout";
import PythonPlayground from "components/playground/PythonPlayground";

export default function PythonPlaygroundPage() {
  return (
    <Layout excludeHeader={true} excludeFooter={true}>
      <PythonPlayground />
    </Layout>
  );
}
