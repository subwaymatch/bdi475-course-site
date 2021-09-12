import { useState } from "react";
import events from "data/schedule.json";
import {
  organizeEventsByYearAndDate,
  getWeeklyDayjsObjectsByYear,
  getLectureNumberByDate,
} from "lib/schedule";
import { ScheduleType, ICalendarEvent } from "types/schedule";
import { motion, AnimatePresence } from "framer-motion";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { IoMdArrowDown } from "react-icons/io";
import styles from "./CourseCalendar.module.scss";
import clsx from "clsx";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);

const today = dayjs().tz("America/Chicago");

const BlankCalendarCell = () => {
  return <div className={styles.calendarCell} />;
};

const CalendarCell = ({ day, dayEvents }) => {
  const dayKey = day.format("YYYY-MM-DD");

  return (
    <div key={dayKey} className={styles.calendarCell}>
      <div
        className={clsx(styles.day, {
          [styles.today]: today.isSame(day, "day"),
        })}
      >
        <div className={styles.todayIndicator}>
          <span>Today</span>
          <IoMdArrowDown className={styles.todayIcon} />
        </div>
        <div className={styles.dayHeader}>
          <span className={styles.date}>
            <span>{day.format("MM")}</span>
            <div className={styles.dateDivider}>⁄</div>
            <span>{day.format("DD")}</span>
          </span>
          <span className={styles.weekday}>{day.format("ddd")}</span>
        </div>

        {dayEvents && (
          <div className={styles.dayContent}>
            {dayEvents.hasOwnProperty(ScheduleType.Quiz) &&
              dayEvents[ScheduleType.Quiz].map((text, idx) => (
                <div
                  key={`${dayKey}-quiz-${idx}`}
                  className={clsx(styles.quiz, styles.box)}
                >
                  {text}
                </div>
              ))}

            {dayEvents.hasOwnProperty(ScheduleType.Lecture) && (
              <div className={clsx(styles.lecture, styles.box)}>
                <h3 className={styles.lectureHeading}>
                  Lecture{" "}
                  {
                    getLectureNumberByDate(events as ICalendarEvent[])[
                      day.format("YYYY-MM-DD")
                    ]
                  }
                </h3>

                <div className={styles.lectureTopics}>
                  {dayEvents[ScheduleType.Lecture].map((text, idx) => (
                    <div
                      key={`${dayKey}-topic-${idx}`}
                      className={styles.topic}
                    >
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {dayEvents.hasOwnProperty(ScheduleType.Exercise) &&
              dayEvents[ScheduleType.Exercise].map((text, idx) => (
                <div
                  key={`${dayKey}-ac-${idx}`}
                  className={clsx(styles.exercise, styles.box)}
                >
                  {text}
                </div>
              ))}

            {dayEvents.hasOwnProperty(ScheduleType.NoLecture) &&
              dayEvents[ScheduleType.NoLecture].map((text, idx) => (
                <div key={idx} className={clsx(styles.noLecture, styles.box)}>
                  {text}
                </div>
              ))}

            {dayEvents.hasOwnProperty(ScheduleType.CaseStudy) &&
              dayEvents[ScheduleType.CaseStudy].map((text, idx) => (
                <div key={idx} className={clsx(styles.caseStudy, styles.box)}>
                  {text}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface ICalendarWeekProps {
  year: number;
  week: dayjs.Dayjs[] | null;
  show: boolean;
}

const CalendarWeek = ({ year, week, show }: ICalendarWeekProps) => {
  let blankCellCount = 0;

  const eventsByYear = organizeEventsByYearAndDate(events as ICalendarEvent[]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={`calendar-row-year-${year}-week-${week}`}
          className={styles.calendarRow}
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: "auto" },
            collapsed: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          {week.map((day) => {
            if (!day) {
              return <BlankCalendarCell key={blankCellCount++} />;
            }

            const dayKey = day.format("YYYY-MM-DD");
            const dayEvents = eventsByYear[year][dayKey];

            return (
              <CalendarCell key={dayKey} day={day} dayEvents={dayEvents} />
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

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
      className={clsx(styles.calendar, {
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
