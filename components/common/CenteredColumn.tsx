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
        xl={{
          span: 6,
          offset: 3,
        }}
        lg={{
          span: 8,
          offset: 2,
        }}
        md={{
          span: 12,
          offset: 0,
        }}
      >
        <div className={className}>{children}</div>
      </Col>
    </Row>
  );
}
