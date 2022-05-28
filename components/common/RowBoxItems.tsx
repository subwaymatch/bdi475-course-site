import { ReactNode, Children } from "react";
import { Row, Col } from "react-bootstrap";
import clsx from "clsx";
import styles from "./RowBoxItems.module.scss";
import Chip from "./Chip";
import { ColorTheme } from "types/color-theme";

interface IRowBoxItemsProps {
  title: string;
  color?: string;
  children?: ReactNode;
  className?: string;
}

export default function RowBoxItems({
  title,
  color,
  children,
  className,
}: IRowBoxItemsProps) {
  const childrenArray = Children.toArray(children);
  const mdLength = 12 / childrenArray.length;

  return (
    <Row
      className={clsx(styles.boxItems, "composable-block", {
        [className]: !!className,
      })}
    >
      <Col>
        <h2 className="sectionTitle">
          {title}
          <span className={clsx("accent", color || ColorTheme.Black)} />
        </h2>

        <Row>
          {Children.map(childrenArray, (child, index) => {
            return (
              <Col md={mdLength}>
                <div className={styles.item} key={index}>
                  {child}
                </div>
              </Col>
            );
          })}
        </Row>
      </Col>
    </Row>
  );
}
