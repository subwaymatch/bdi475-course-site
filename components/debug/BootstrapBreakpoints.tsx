import { Container, Row, Col } from "react-bootstrap";
import styles from "./bootstrap-breakpoints.module.scss";
import clsx from "clsx";

export default function BootstrapBreakpoints() {
  return (
    <>
      {["xs", "sm", "md", "lg", "xl", "xxl"].map((breakpoint) => (
        <>
          <div className={clsx(styles.breakpointOnly, styles[breakpoint])}>
            <span className={styles.label}>Breakpoint Only</span>
            <span>{breakpoint}</span>
          </div>
        </>
      ))}

      {["xxl", "xl", "lg", "md", "sm", "xs"].map((breakpoint) => (
        <>
          <div
            className={clsx(styles.breakpointDown, styles[breakpoint + "Down"])}
          >
            <span className={styles.label}>Breakpoint Down</span>
            <span>{breakpoint} and down</span>
          </div>
        </>
      ))}
    </>
  );
}
