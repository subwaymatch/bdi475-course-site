import { Row, Col } from "react-bootstrap";
import clsx from "clsx";
import styles from "./SectionTitle.module.scss";

interface ISectionTitleProps {
  children: React.ReactNode;
  grayBottomBorder?: boolean;
  className?: string;
}

export default function SectionTitle({
  children,
  grayBottomBorder,
  className,
}: ISectionTitleProps) {
  return (
    <Row>
      <Col>
        <div
          className={clsx(styles.sectionTitle, {
            grayBottomBorder,
            [className]: !!className,
          })}
        >
          <h2>{children}</h2>
        </div>
      </Col>
    </Row>
  );
}
