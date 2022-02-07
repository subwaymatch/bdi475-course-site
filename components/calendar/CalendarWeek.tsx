import events from "data/schedule.json";
import { organizeEventsByYearAndDate } from "lib/schedule";
import { ICalendarEvent } from "types/schedule";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CalendarWeek.module.scss";
import dayjs from "dayjs";
import CalendarCell from "./CalendarCell";

interface ICalendarWeekProps {
  year: number;
  week: dayjs.Dayjs[] | null;
  show: boolean;
}

export default function CalendarWeek({ year, week, show }: ICalendarWeekProps) {
  let blankCellCount = 0;

  const eventsByYear = organizeEventsByYearAndDate(events as ICalendarEvent[]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={`calendar-row -year-${year}-week-${week}`}
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
              return <CalendarCell key={blankCellCount++} />;
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
}
