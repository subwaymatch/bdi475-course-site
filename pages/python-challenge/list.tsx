import React, { useState, useEffect } from "react";
import Layout from "components/Layout";
import { Col, Container, Row } from "react-bootstrap";
import ChallengeList from "components/challenge-list/ChallengeList";
import ReactPaginate from "react-paginate";
import { IChallengeListItemProps } from "components/challenge-list/ChallengeListItem";
import styles from "styles/pages/python-challenge/list.module.scss";
import { supabaseClient } from "lib/supabase/supabaseClient";
import { toast } from "react-toastify";
import { definitions } from "types/database";
import { useRouter } from "next/router";

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
      .from<definitions["coding_challenges"]>("coding_challenges")
      .select("id", { head: true, count: "exact" });

    setTotalNumberOfPages(Math.ceil(count / pageSize));
  };

  const toListItem = (challengeData: definitions["coding_challenges"]) => {
    const item: IChallengeListItemProps = {
      id: String(challengeData.id),
      title: challengeData.title,
      createdAt: new Date(challengeData.created_at),
      updatedAt: new Date(challengeData.updated_at),
      permalink: `/python-challenge/view/${challengeData.id}`,
      editLink: `/python-challenge/edit/${challengeData.id}`,
      onDelete: async () => {
        if (
          window.confirm(
            "Are you sure you want to delete this challenge? This cannot be undone."
          )
        ) {
          const { data: deleteResultData, error } = await supabaseClient
            .from("coding_challenges")
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
      .from<definitions["coding_challenges"]>("coding_challenges")
      .select()
      .eq("language", "Python")
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
    const { data: challengeData, error: challengeError } = await supabaseClient
      .from<definitions["coding_challenges"]>("coding_challenges")
      .insert([{}]);

    if (challengeError) {
      console.error(challengeError);

      toast.error("Error creating a new challenge: " + challengeError.message);
      return;
    }

    const newChallengeId = challengeData[0].id;

    const { data: solutionData, error: solutionError } = await supabaseClient
      .from<definitions["coding_challenge_solutions"]>(
        "coding_challenge_solutions"
      )
      .insert([
        {
          challenge_id: newChallengeId,
        },
      ]);

    if (solutionError) {
      console.error(solutionError);

      toast.error(
        `Error creating a solution entry for ${newChallengeId}: ${solutionError.message}`
      );
      return;
    }

    router.push(`/python-challenge/edit/${challengeData[0].id}`);
  };

  useEffect(() => {
    calculatePageCount();
  }, []);

  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h2 className="sectionTitle grayBottomBorder">
                Python Challenges
                <span className="accent pink" />
              </h2>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <button
                onClick={createNewChallenge}
                className={styles.createButton}
              >
                + Create
              </button>
            </Col>

            <Col md={4}>Page {currentPageIndex + 1}</Col>
          </Row>

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
