import { useState } from "react";
import events from "data/schedule.json";
import { getWeeklyDayjsObjectsByYear } from "lib/schedule";
import { ICalendarEvent } from "types/schedule";
import { motion, AnimatePresence } from "framer-motion";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import styles from "./CourseCalendar.module.scss";
import clsx from "clsx";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import CalendarWeek from "./CalendarWeek";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);

const today = dayjs().tz("America/Chicago");

export default function CourseCalendar() {
  const weeklyDayjsObjectsByYear = getWeeklyDayjsObjectsByYear(
    events as ICalendarEvent[]
  );
  const eventYears = Object.keys(weeklyDayjsObjectsByYear).map((o) =>
    Number.parseInt(o)
  );
  const [showPrev, setShowPrev] = useState(false);

  return (
    <div
      className={clsx(styles.courseCalendar, {
        [styles.hidePrev]: !showPrev,
      })}
    >
      {true && (
        <div
          className={styles.togglePrevButton}
          onClick={() => {
            setShowPrev(!showPrev);
          }}
        >
          {showPrev ? (
            <>
              <BsChevronUp className={styles.reactIcon} />
              <span>Hide Previous Weeks</span>
            </>
          ) : (
            <>
              <BsChevronDown className={styles.reactIcon} />
              <span>Show Previous Weeks</span>
            </>
          )}
        </div>
      )}

      {eventYears.map((year) => (
        <div key={`calendar-${year}`} className={styles.yearWrapper}>
          <AnimatePresence>
            {(showPrev || year >= today.year()) && (
              <motion.h2
                className="sectionTitle"
                key={`year-${year}-heading`}
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: "auto" },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
                <span>{year}</span>
                <span className="blue accent" />
              </motion.h2>
            )}
          </AnimatePresence>

          {weeklyDayjsObjectsByYear[year].map((week, weekIndex) => (
            <CalendarWeek
              year={year}
              key={`year-${year}-week-${weekIndex}`}
              week={week}
              show={
                showPrev
                  ? true
                  : week.find((o) => o !== null).isSameOrAfter(today, "week")
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}
