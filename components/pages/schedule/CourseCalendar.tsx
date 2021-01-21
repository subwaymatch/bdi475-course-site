import { useState } from "react";
import moment from "moment";
import { eventsByDate, lectureNumberByDate } from "lib/schedule";
import { ScheduleType } from "typings/schedule";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { IoMdArrowDown } from "react-icons/io";
import styles from "./CourseCalendar.module.scss";
import clsx from "clsx";

const eventDates = Object.keys(eventsByDate).sort();
const startWeekIndex = moment("20210101").week();
const endWeekIndex = moment(eventDates[eventDates.length - 1]).week();
const currentWeekIndex = moment().week();
const todayKey = moment().format("YYYYMMDD");

let calendar = [];

for (let weekIndex = startWeekIndex; weekIndex <= endWeekIndex; weekIndex++) {
  calendar.push(
    Array(7)
      .fill(0)
      .map((n, i) =>
        moment()
          .week(weekIndex)
          .startOf("week")
          .clone()
          .add(n + i, "day")
      )
  );
}

const CalendarCell = ({ day, dayEvents }) => {
  const dayKey = day.format("YYYYMMDD");

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
                  Lecture {lectureNumberByDate[day.format("MMDD")]}
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

            {dayEvents.hasOwnProperty(ScheduleType.AfterClassExercise) &&
              dayEvents[ScheduleType.AfterClassExercise].map((text, idx) => (
                <div
                  key={`${dayKey}_ac_${idx}`}
                  className={clsx(styles.afterClassExercise, styles.box)}
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

const CalendarWeek = ({ week, show, isPrevWeek }) => {
  return (
    show && (
      <div key={`week-${week}`} className={styles.calendarRow}>
        {week.map((day) => {
          const dayKey = day.format("YYYYMMDD");
          const dayEvents = eventsByDate[dayKey];

          return <CalendarCell key={dayKey} day={day} dayEvents={dayEvents} />;
        })}
      </div>
    )
  );
};

export default function CourseCalendar() {
  const [showPrev, setShowPrev] = useState(false);

  return (
    <div
      className={clsx(styles.calendar, {
        [styles.hidePrev]: !showPrev,
      })}
    >
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

      <h2 className="sectionTitle">
        2021
        <span className="blueAccent" />
      </h2>

      {calendar.map((week, weekIndex) => (
        <CalendarWeek
          key={`week-${week}`}
          week={week}
          show={
            showPrev ? true : weekIndex >= currentWeekIndex - startWeekIndex
          }
          isPrevWeek={weekIndex < currentWeekIndex - startWeekIndex}
        />
      ))}
    </div>
  );
}
