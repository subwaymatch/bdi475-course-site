import { Row, Col } from "react-bootstrap";
import clsx from "clsx";
import styles from "./LargeQuote.module.scss";

interface ILargeQuoteProps {
  children: React.ReactNode;
  className?: string;
}

export default function LargeQuote({ children, className }: ILargeQuoteProps) {
  return (
    <Row>
      <Col>
        <div
          className={clsx("composable-block", {
            [className]: !!className,
          })}
        >
          <blockquote className={styles.largeQuote}>{children}</blockquote>
        </div>
      </Col>
    </Row>
  );
}
