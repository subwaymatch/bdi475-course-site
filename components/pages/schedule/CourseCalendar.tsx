import { useState } from "react";
import { eventsByYear, lectureNumberByDate } from "lib/schedule";
import { ScheduleType } from "types/schedule";
import { motion, AnimatePresence } from "framer-motion";

import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { IoMdArrowDown } from "react-icons/io";
import styles from "./CourseCalendar.module.scss";
import clsx from "clsx";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import weekYear from "dayjs/plugin/weekYear";
import weekOfYear from "dayjs/plugin/weekOfYear";
import dayOfYear from "dayjs/plugin/dayOfYear";

dayjs.extend(weekYear);
dayjs.extend(weekOfYear);
dayjs.extend(dayOfYear);
dayjs.extend(utc);
dayjs.extend(timezone);

const eventYears = Object.keys(eventsByYear)
  .map((y) => Number.parseInt(y))
  .sort();
const dayjsEventsByYears = {};

if (typeof window !== "undefined") {
  (window as any).dayjs = dayjs;
}

interface IYearAndWeek {
  year: number;
  week: number;
}

eventYears.forEach((year) => {
  const eventDates = Object.keys(eventsByYear[year]).sort();
  const startDate =
    year === eventYears[0]
      ? dayjs(eventDates[0])
      : dayjs().year(year).startOf("year");
  const startWeekYear = startDate.weekYear();
  const endDate =
    year === eventYears[eventYears.length - 1]
      ? dayjs(eventDates[eventDates.length - 1])
      : dayjs()
          .year(year + 1)
          .startOf("year")
          .subtract(1, "day");
  const endWeekYear = endDate.weekYear();
  const displayFirstWeekOfNextYear = endWeekYear > startWeekYear;
  const startWeekIndex = startDate.week();
  const endWeekIndex = displayFirstWeekOfNextYear
    ? endDate.subtract(1, "week").week()
    : endDate.week();
  const yearAndWeeks: IYearAndWeek[] = [];
  const weeklyEvents = [];

  for (let week = startWeekIndex; week <= endWeekIndex; week++) {
    yearAndWeeks.push({
      year,
      week,
    });
  }

  if (displayFirstWeekOfNextYear) {
    yearAndWeeks.push({
      year: year + 1,
      week: 1,
    });
  }

  yearAndWeeks.forEach((o) => {
    weeklyEvents.push(
      Array(7)
        .fill(0)
        .map((n, i) =>
          dayjs()
            .year(o.year)
            .week(o.week)
            .startOf("week")
            .clone()
            .add(i, "day")
        )
        .map((dayjsObject) =>
          dayjsObject.year() === year ? dayjsObject : null
        )
    );
  });

  dayjsEventsByYears[year] = weeklyEvents;
});

console.log(dayjsEventsByYears);

// TODO: Refactor to enable events spanning through two or more years
// Currently, only events in a single year is supported
const currentYear = dayjs().year();
const currentWeekIndex = dayjs().week();
const todayKey = dayjs().tz("America/Chicago").format("YYYY-MM-DD");

const CalendarCell = ({ day, dayEvents }) => {
  const dayKey = day.format("YYYY-MM-DD");

  return (
    <div key={dayKey} className={styles.calendarCell}>
      <div
        className={clsx(styles.day, {
          [styles.today]: todayKey === dayKey,
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
                  key={`${dayKey}_quiz_${idx}`}
                  className={clsx(styles.quiz, styles.box)}
                >
                  {text}
                </div>
              ))}

            {dayEvents.hasOwnProperty(ScheduleType.Lecture) && (
              <div className={clsx(styles.lecture, styles.box)}>
                <h3 className={styles.lectureHeading}>
                  Lecture {lectureNumberByDate[day.format("YYYY-MM-DD")]}
                </h3>

                <div className={styles.lectureTopics}>
                  {dayEvents[ScheduleType.Lecture].map((text, idx) => (
                    <div
                      key={`${dayKey}_topic_${idx}`}
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
                  key={`${dayKey}_ac_${idx}`}
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

const CalendarWeek = ({ week, show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={`week-${week}`}
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
            const dayKey = day.format("YYYY-MM-DD");
            const dayEvents = eventsByYear[2021][dayKey];

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
  return (
    <>
      <div>Calendar</div>
    </>
  );
}

// export default function CourseCalendar() {
//   const [showPrev, setShowPrev] = useState(false);

//   console.log(
//     `startWeekIndex=${startWeekIndex}, currentWeekIndex=${currentWeekIndex}`
//   );

//   return (
//     <div
//       className={clsx(styles.calendar, {
//         [styles.hidePrev]: !showPrev,
//       })}
//     >
//       {currentWeekIndex > startWeekIndex && (
//         <div
//           className={styles.togglePrevButton}
//           onClick={() => {
//             setShowPrev(!showPrev);
//           }}
//         >
//           {showPrev ? (
//             <>
//               <BsChevronUp className={styles.reactIcon} />
//               <span>Hide Previous Weeks</span>
//             </>
//           ) : (
//             <>
//               <BsChevronDown className={styles.reactIcon} />
//               <span>Show Previous Weeks</span>
//             </>
//           )}
//         </div>
//       )}

//       <h2 className="sectionTitle">
//         2021
//         <span className="blueAccent" />
//       </h2>

//       {weeklyEvents.map((week, weekIndex) => (
//         <CalendarWeek
//           key={`week-${week}`}
//           week={week}
//           show={
//             showPrev ? true : weekIndex >= currentWeekIndex - startWeekIndex
//           }
//         />
//       ))}
//     </div>
//   );
// }
