import events from "data/schedule.json";
import { getLectureNumberByDate } from "lib/schedule";
import { ScheduleType, ICalendarEvent } from "types/schedule";
import { IoMdArrowDown } from "react-icons/io";
import styles from "./CalendarCell.module.scss";
import clsx from "clsx";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);

const today = dayjs().tz("America/Chicago");

interface ICalendarCellProps {
  day?: dayjs.Dayjs;
  dayEvents?: ICalendarEvent[];
}

export default function CalendarCell({ day, dayEvents }: ICalendarCellProps) {
  const dayKey = day?.format("YYYY-MM-DD");

  if (!day && !dayEvents) {
    return <div className={styles.calendarCell} />;
  }

  return (
    <div className={styles.calendarCell}>
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
            {dayEvents.map((calendarItem, itemIndex) => {
              const t = calendarItem.type;
              const tArr = calendarItem.text as string[];

              return (
                <div
                  key={`${dayKey}-${t}-${itemIndex}`}
                  className={clsx(styles[t], styles.box)}
                >
                  {t === ScheduleType.Lecture && (
                    <h3 className={styles.heading}>
                      Lecture{" "}
                      {
                        getLectureNumberByDate(events as ICalendarEvent[])[
                          day.format("YYYY-MM-DD")
                        ]
                      }
                    </h3>
                  )}

                  <div className={styles.items}>
                    {tArr.map((text, idx) => (
                      <div key={idx}>{text}</div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
