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
  const [currentPage, setCurrentPage] = useState(1);
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
            "Are you sure you want to delete this question? This cannot be undone."
          )
        ) {
          // await collectionRef.doc(cid).delete();

          toast.info(
            <div>
              Deleted question <code>{challengeData.id}</code>
            </div>
          );
        }
      },
    };

    return item;
  };

  const loadPage = async () => {
    setStatus("loading");

    const { data, error } = await supabaseClient
      .from<definitions["coding_challenges"]>("coding_challenges")
      .select()
      .eq("language", "Python")
      .order("updated_at", { ascending: false })
      .range(currentPage * pageSize + 1, (currentPage + 1) * pageSize);

    if (!error) {
      setListItems(data.map((o) => toListItem(o)));
      setStatus("success");
    }
  };

  const handlePageClick = (data) => {
    let selected = data.selected;

    setCurrentPage(data.selected);
  };

  useEffect(() => {
    calculatePageCount();
  }, []);

  useEffect(() => {
    loadPage();
  }, [currentPage]);

  return (
    <Layout>
      {status === "loading" ? (
        <Container>
          <Row>
            <Col>Loading...</Col>
          </Row>
        </Container>
      ) : (
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
              <Col>
                <Link href="/python-challenge/new">
                  <a className={styles.createButton}>+ Create</a>
                </Link>
              </Col>
            </Row>
            <ChallengeList items={listItems} />
            <Row>
              <Col md={12}>
                <ReactPaginate
                  pageCount={totalNumberOfPages}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={(data) => {
                    console.log(`onPageChange`);
                    console.log(data);
                    setCurrentPage(data.selected);
                  }}
                />
              </Col>
            </Row>
          </Container>
        </main>
      )}
    </Layout>
  );
}
