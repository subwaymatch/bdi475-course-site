import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import styles from "./RotatedSideBars.module.scss";
import Triangle from "components/shapes/Triangle";
import StackedRectangles from "components/shapes/StackedRectangles";
import HalfCircleTilted from "components/shapes/HalfCircleTilted";
import IllinoisBlockILogo from "components/shapes/IllinoisBlockILogo";
import DonutCircleSmall from "components/shapes/DonutCircleSmall";
import DonutCircleMedium from "components/shapes/DonutCircleMedium";
import Rectangle01 from "components/shapes/Rectangle01";
import FullCircle from "components/shapes/FullCircle";
import colors from "styles/colors.module.scss";

const loaderVariants = {
  animationBlockILogo: {},
  animationTopCircle: {
    scale: [0.9, 1],
    transition: {
      scale: {
        yoyo: Infinity,
        duration: 0.5,
      },
    },
  },
  animationRightRect: {
    x: [-20, 20],
    y: [0, -20],
    rotate: [-30, 30],
    transition: {
      rotate: {
        yoyo: Infinity,
        duration: 4,
      },
      x: {
        yoyo: Infinity,
        duration: 2,
      },
      y: {
        yoyo: Infinity,
        duration: 1,
        ease: "easeOut",
      },
    },
  },
  animationRightCircle: {
    y: [10, -10],
    x: 0,
    transition: {
      y: {
        yoyo: Infinity,
        duration: 1,
        ease: "easeOut",
      },
    },
  },
  tilt: {
    rotate: [-2, 2, -2],
    scale: [0.98, 1],
    transition: {
      rotate: {
        yoyo: Infinity,
        duration: 3,
      },
      scale: {
        yoyo: Infinity,
        duration: 1,
      },
    },
  },
  tilt2: {
    rotate: [-4, 2, -4],
    scale: [0.92, 1],
    transition: {
      rotate: {
        yoyo: Infinity,
        duration: 2,
      },
      scale: {
        yoyo: Infinity,
        duration: 1,
      },
    },
  },
};

export default function RotatedSideBars() {
  return (
    <>
      <div className={styles.sideFloatingBar}>
        <span className={styles.univName}>
          University of Illinois at Urbana-Champaign
        </span>{" "}
        <motion.div className={styles.illinoisLogoWrapper}>
          <IllinoisBlockILogo color={colors.green} />
        </motion.div>
        <span className={styles.courses}>Business Data &amp; Innovation</span>{" "}
        <motion.div
          variants={loaderVariants}
          animate="animationTopCircle"
          className={styles.circleWrapper}
        >
          <DonutCircleMedium color={colors.green} />
        </motion.div>
      </div>
    </>
  );
}
