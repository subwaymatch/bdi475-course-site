
import Layout from 'components/Layout';
import Header from 'components/Header';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';

export default function SyllabusPage() {
    return (
        <Layout>
            <Header />

            <main>
                <Container>
                    <Row>
                        <Col>
                            <h1>Introduction to Data Analytics Applications in Business</h1>
                        </Col>
                    </Row>
                </Container>
            </main>
        </Layout>
    );
}