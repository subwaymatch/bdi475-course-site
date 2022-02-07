import {
  ScheduleType,
  ICalendarEvent,
  ILectureNumberMap,
  IWeeklyDayjsObjectsByYear,
  IYearAndWeek,
  IEventsByYear,
} from "types/schedule";
import dayjs from "dayjs";
import weekYear from "dayjs/plugin/weekYear";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekYear);
dayjs.extend(weekOfYear);

// Returns a map of lecture date strings and corresponding numbers
// Sample output:
// {
//   "2020-08-14": 1,
//   "2021-08-24": 2,
//   "2021-08-26": 3,
// }
export function getLectureNumberByDate(
  events: ICalendarEvent[]
): ILectureNumberMap {
  return events
    .filter((evt) => evt.type === ScheduleType.Lecture)
    .reduce((acc, evt, index) => {
      acc[evt.date] = index + 1;

      return acc;
    }, {});
}

export function organizeEventsByYearAndDate(
  events: ICalendarEvent[]
): IEventsByYear {
  // Sort the events list by date
  events.sort((a, b) => (a.date > b.date ? 1 : -1));

  const organizedEvents = {};

  events.forEach((event) => {
    const year = event.date.substring(0, 4);

    if (!organizedEvents.hasOwnProperty(year)) {
      organizedEvents[year] = {};
    }

    const yearEvents = organizedEvents[year];

    if (!yearEvents.hasOwnProperty(event.date)) {
      yearEvents[event.date] = [];
    }

    event.text = Array.isArray(event.text) ? event.text : [event.text];

    yearEvents[event.date].push(event);
  });

  return organizedEvents;
}

export function getWeeklyDayjsObjectsByYear(
  events: ICalendarEvent[]
): IWeeklyDayjsObjectsByYear {
  const eventsByYear = organizeEventsByYearAndDate(events);

  const eventYears = Object.keys(eventsByYear)
    .map((y) => Number.parseInt(y))
    .sort();
  const weeklyDayjsObjectsByYear: IWeeklyDayjsObjectsByYear = {};

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
              .month(6) // fix https://github.com/iamkun/dayjs/issues/1751
              .week(o.week)
              .startOf("week")
              .add(i, "day")
          )
          .map((dayjsObject) =>
            dayjsObject.year() === year ? dayjsObject : null
          )
      );
    });

    weeklyDayjsObjectsByYear[year] = weeklyEvents;
  });

  return weeklyDayjsObjectsByYear;
}
