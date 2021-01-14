import Layout from "components/Layout";
import Header from "components/Header";
import CourseCalendar from "components/pages/schedule/CourseCalendar";

export default function SchedulePage() {
  return (
    <Layout>
      <Header />

      <CourseCalendar />
    </Layout>
  );
}
