import Layout from "components/Layout";
import Button from "components/ui/Button";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import { supabaseClient } from "lib/supabase/supabaseClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  IChallengeResult,
  IChallengeResultSummary,
  IChallengeTypeAndId,
} from "types/challenge";
import {
  expandFromQueryObject,
  getMultipleChoiceIds,
  getPythonChallengeIds,
} from "utils/challenge";
import saveAs from "file-saver";
import dayjs from "dayjs";
import { GrDocumentCsv } from "react-icons/gr";
import { ColorTheme } from "types/color-theme";
import { BsDownload } from "react-icons/bs";
import { RiDownloadLine } from "react-icons/ri";
import Link from "next/link";

export default function ChallengeResultDetails() {
  const { isAdmin } = useSupabaseAuth();
  const router = useRouter();
  const [challenges, setChallenges] = useState<IChallengeTypeAndId[]>(null);
  const [results, setResults] = useState<IChallengeResultSummary[]>(null);

  return (
    <Layout>
      <div className="page">
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">Result Details</h1>
            </Col>
          </Row>

          {!results && (
            <Row>
              <Col>Loading...</Col>
            </Row>
          )}
        </Container>
      </div>
    </Layout>
  );
}
