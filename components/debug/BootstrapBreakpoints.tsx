import styles from "./bootstrap-breakpoints.module.scss";
import clsx from "clsx";

export default function BootstrapBreakpoints() {
  return (
    <>
      {["xs", "sm", "md", "lg", "xl", "xxl"].map((breakpoint) => (
        <div
          key={breakpoint + "Only"}
          className={clsx(styles.breakpointOnly, styles[breakpoint])}
        >
          <span className={styles.label}>Breakpoint Only</span>
          <span>{breakpoint}</span>
        </div>
      ))}

      {["xxl", "xl", "lg", "md", "sm", "xs"].map((breakpoint) => (
        <div
          key={breakpoint + "Down"}
          className={clsx(styles.breakpointDown, styles[breakpoint + "Down"])}
        >
          <span className={styles.label}>Breakpoint Down</span>
          <span className={styles.className}>
            @include media-breakpoint-down({breakpoint})
          </span>
        </div>
      ))}
    </>
  );
}
