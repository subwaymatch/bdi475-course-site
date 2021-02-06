import { Row, Col } from "react-bootstrap";

interface ICenteredColumnProps {
  children: React.ReactNode;
  className?: string;
}

export default function CenteredColumn({
  children,
  className,
}: ICenteredColumnProps) {
  return (
    <Row>
      <Col
        lg={{
          span: 6,
          offset: 3,
        }}
        md={{
          span: 8,
          offset: 2,
        }}
      >
        <div className={className}>{children}</div>
      </Col>
    </Row>
  );
}
