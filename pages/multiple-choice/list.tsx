import React, { useState, useEffect } from "react";
import Layout from "components/Layout";
import { Col, Container, Row } from "react-bootstrap";
import ChallengeList from "components/challenges/list/ChallengeList";
import ReactPaginate from "react-paginate";
import { IChallengeListItemProps } from "components/challenges/list/ChallengeListItem";
import { supabaseClient } from "lib/supabase/supabaseClient";
import { toast } from "react-toastify";
import { definitions } from "types/database";
import { useRouter } from "next/router";
import ChallengeListHeader from "components/challenges/list/ChallengeListHeader";

export default function PythonChallengeListPage({ page }) {
  const initialPage = Number(page);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
  // zero-based page number
  const [currentPageIndex, setCurrentPageIndex] = useState(initialPage - 1);
  const [pageSize, setPageSize] = useState(20);
  const [listItems, setListItems] = useState<IChallengeListItemProps[]>([]);
  const router = useRouter();
  const calculatePageCount = async () => {
    const { count } = await supabaseClient
      .from<definitions["multiple_choice_questions"]>(
        "multiple_choice_questions"
      )
      .select("id", { head: true, count: "exact" });

    setTotalNumberOfPages(Math.ceil(count / pageSize));
  };

  const toListItem = (
    challengeData: definitions["multiple_choice_questions"]
  ) => {
    const item: IChallengeListItemProps = {
      id: String(challengeData.id),
      title: challengeData.title,
      createdAt: new Date(challengeData.created_at),
      updatedAt: new Date(challengeData.updated_at),
      permalink: `/multiple-choice/view/${challengeData.id}`,
      editLink: `/multiple-choice/edit/${challengeData.id}`,
      onDelete: async () => {
        if (
          window.confirm(
            "Are you sure you want to delete this challenge? This cannot be undone."
          )
        ) {
          const { data: deleteResultData, error } = await supabaseClient
            .from("multiple_choice_questions")
            .delete()
            .match({ id: challengeData.id });

          if (!error) {
            setListItems((prevItems) =>
              prevItems.filter((o) => o.id !== String(challengeData.id))
            );

            toast.info(
              <div>
                Deleted challenge <code>{challengeData.id}</code>
              </div>
            );
          } else {
            toast.error(`Error deleting ${challengeData.id}: ${error.message}`);
          }
        }
      },
    };

    return item;
  };

  const loadPage = async (pageIndex: number) => {
    const { data, error } = await supabaseClient
      .from<definitions["multiple_choice_questions"]>(
        "multiple_choice_questions"
      )
      .select()
      .order("updated_at", { ascending: false })
      .range(pageIndex * pageSize, (pageIndex + 1) * pageSize);

    if (!error) {
      setListItems(data.map((o) => toListItem(o)));
    } else {
      toast.error("Error loading data: " + error.message);
    }
  };

  const handlePageChange = async (pageIndex: number) => {
    setCurrentPageIndex(pageIndex);
    loadPage(pageIndex);

    router.push({
      pathname: router.pathname,
      query: { page: pageIndex + 1 },
    });
  };

  const createNewChallenge = async () => {
    const { data: challengeInsertResult, error: challengeInsertError } =
      await supabaseClient
        .from<definitions["multiple_choice_questions"]>(
          "multiple_choice_questions"
        )
        .insert([
          {
            title: "",
            text_markdown: "",
            explanation_markdown: "",
          },
        ]);

    if (challengeInsertError) {
      console.error(challengeInsertError);

      toast.error(
        "Error creating a new challenge: " + challengeInsertError.message
      );
      return;
    }

    const newChallengeId = challengeInsertResult[0].id;

    const { data: optionsInsertData, error: optionsInsertError } =
      await supabaseClient
        .from<definitions["multiple_choice_options"]>("multiple_choice_options")
        .insert([
          {
            question_id: newChallengeId,
            text_markdown: "",
            is_correct: false,
            order: 0,
            explanation_markdown: "",
          },
          {
            question_id: newChallengeId,
            text_markdown: "",
            is_correct: false,
            order: 1,
            explanation_markdown: "",
          },
        ]);

    if (optionsInsertError) {
      console.error(optionsInsertError);

      toast.error("Error creating options: " + optionsInsertError.message);
      return;
    }

    router.push(`/multiple-choice/edit/${newChallengeId}`);
  };

  useEffect(() => {
    calculatePageCount();
  }, []);

  return (
    <Layout>
      <main className="page">
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">Multiple Choice</h1>
            </Col>
          </Row>

          <ChallengeListHeader
            create={createNewChallenge}
            currentPage={currentPageIndex}
          />

          <ChallengeList items={listItems} />

          <Row>
            <Col md={12}>
              <div className="paginationContainer">
                <ReactPaginate
                  pageCount={totalNumberOfPages}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  initialPage={initialPage - 1}
                  onPageChange={(data) => handlePageChange(data.selected)}
                  containerClassName="pagination"
                  activeClassName="active"
                  pageClassName="page"
                  previousLabel="←"
                  previousClassName="previous"
                  nextLabel="→"
                  nextClassName="next"
                  eventListener="onClick"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  return {
    props: {
      page: query.page ? query.page : "1",
    },
  };
}
