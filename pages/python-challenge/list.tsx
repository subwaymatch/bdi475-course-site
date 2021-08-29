import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "components/Layout";
import { Col, Container, Row } from "react-bootstrap";
import ChallengeList from "components/challenge-list/ChallengeList";
import ReactPaginate from "react-paginate";
import { IChallengeListItemProps } from "components/challenge-list/ChallengeListItem";
import styles from "styles/pages/python-challenge/list.module.scss";
import { supabaseClient } from "lib/supabase/supabaseClient";
import { toast } from "react-toastify";
import { definitions } from "types/database";

export default function PythonChallengeListPage() {
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [listItems, setListItems] = useState<IChallengeListItemProps[]>([]);
  const [status, setStatus] = useState("loading");

  const calculatePageCount = async () => {
    const { count } = await supabaseClient
      .from<definitions["coding_challenges"]>("coding_challenges")
      .select("id", { head: true, count: "exact" });

    setTotalNumberOfPages(Math.ceil(count / pageSize));
  };

  const toListItem = (challengeData: definitions["coding_challenges"]) => {
    const item: IChallengeListItemProps = {
      id: challengeData.id,
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
          // await collectionRef.doc(cid).delete();

          toast.info(
            <div>
              Deleted challenge <code>{challengeData.id}</code>
            </div>
          );
        }
      },
    };

    return item;
  };

  const initialize = async () => {
    await calculatePageCount();
    await loadPage();
  };

  const loadPage = async () => {
    console.log(`loadPage currentPageIndex=${currentPageIndex}`);
    setStatus("loading");
    const { data, error } = await supabaseClient
      .from<definitions["coding_challenges"]>("coding_challenges")
      .select()
      .eq("language", "Python")
      .order("updated_at", { ascending: false })
      .range(
        currentPageIndex * pageSize + 1,
        (currentPageIndex + 1) * pageSize
      );

    if (!error) {
      setListItems(data.map((o) => toListItem(o)));
      setStatus("success");
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const handlePageClick = async (data) => {
    console.log(`handlePageClick`);
    console.log(data);
    setCurrentPageIndex(data.selected);
    await loadPage();
  };

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
              <Link href="/python-challenge/new">
                <a className={styles.createButton}>+ Create</a>
              </Link>
            </Col>

            <Col md={4}>Page {currentPageIndex + 1}</Col>
          </Row>

          {status === "loading" ? (
            <Row>
              <Col>Loading...</Col>
            </Row>
          ) : (
            <ChallengeList items={listItems} />
          )}

          <Row>
            <Col md={12}>
              <div className="paginationContainer">
                <ReactPaginate
                  pageCount={totalNumberOfPages}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
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
