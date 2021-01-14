import Image from 'next/image';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';

export default function Header() {
    return (
        <header>
            <Container>
                <Row className="align-items-center">
                    <Col md={2}>
                        <div style={{
                            lineHeight: 0
                        }}>
                            <Link href="/">
                                <Image src="/images/logo_bdi475.svg"
                                    alt="Tabbied"
                                    layout="fixed"
                                    width={124}
                                    height={25}
                                />
                            </Link>
                        </div>
                    </Col>

                    <Col md={8}>
                        <Row className="align-items-center">
                            <Col md={3}>
                                <Link href="/syllabus">
                                    Syllabus
                                </Link>
                            </Col>

                            <Col md={3}>
                                <Link href="/">
                                    Schedule
                                </Link>
                            </Col>

                            <Col md={3}>
                                <Link href="/">
                                    Assignments
                                </Link>
                            </Col>

                            <Col md={3}>
                                <Link href="/">
                                    Notes
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </header>
    );
}