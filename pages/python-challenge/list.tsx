import React, { useState, useEffect } from "react";
import Layout from "components/Layout";
import { Col, Container, Row } from "react-bootstrap";
import ChallengeList from "components/challenges/list/ChallengeList";
import { IChallengeListItemProps } from "components/challenges/list/ChallengeListItem";
import { supabaseClient } from "lib/supabase/supabaseClient";
import { toast } from "react-toastify";
import { definitions } from "types/database";
import { useRouter } from "next/router";
import ChallengeListHeader from "components/challenges/list/ChallengeListHeader";
import { Pagination } from "@mui/material";

export default function PythonChallengeListPage({ page }) {
  const initialPage = Number(page);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
  // zero-based page number
  const [currentPage, setCurrentPage] = useState(initialPage);
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

  const loadPage = async (page: number) => {
    const pageIndex = page - 1;

    const { data, error } = await supabaseClient
      .from<definitions["coding_challenges"]>("coding_challenges")
      .select()
      .eq("language", "python")
      .order("updated_at", { ascending: false })
      .range(pageIndex * pageSize, (pageIndex + 1) * pageSize - 1);

    if (!error) {
      setListItems(data.map((o) => toListItem(o)));
    } else {
      toast.error("Error loading data: " + error.message);
    }
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    loadPage(page);

    router.push({
      pathname: router.pathname,
      query: { page },
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

    router.push(`/python-challenge/edit/${newChallengeId}`);
  };

  useEffect(() => {
    calculatePageCount();
    loadPage(currentPage);
  }, []);

  return (
    <Layout>
      <main className="page">
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">Python Challenges</h1>
            </Col>
          </Row>

          <ChallengeListHeader
            create={createNewChallenge}
            currentPage={currentPage}
          />

          <ChallengeList items={listItems} />

          <Row>
            <Col>
              <div className="paginationContainer">
                <Pagination
                  boundaryCount={2}
                  count={totalNumberOfPages}
                  page={currentPage}
                  onChange={(event, page) => {
                    handlePageChange(page);
                  }}
                  shape="rounded"
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
