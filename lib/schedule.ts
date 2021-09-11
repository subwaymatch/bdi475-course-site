import _ from "lodash";
import { ScheduleType } from "types/schedule";
// import events from "data/schedule.json";
import events from "data/schedule-test.json";

// Sort the events list by date
events.sort((a, b) => (a.date > b.date ? 1 : -1));

export interface LectureNumberMap {
  [key: string]: number;
}

// Returns a map of lecture date strings and corresponding numbers
// Sample output:
// {
//   "2020-08-14": 1,
//   "2021-08-24": 2,
//   "2021-08-26": 3,
// }
export const lectureNumberByDate: LectureNumberMap = events
  .filter((evt) => evt.type === ScheduleType.Lecture)
  .reduce((acc, evt, index) => {
    acc[evt.date] = index + 1;

    return acc;
  }, {});

const organizeEventsByYearAndDate = (events) => {
  const organizedEvents = {};

  events.forEach((event) => {
    const year = event.date.substring(0, 4);

    if (!organizedEvents.hasOwnProperty(year)) {
      organizedEvents[year] = {};
    }

    const yearEvents = organizedEvents[year];

    if (!yearEvents.hasOwnProperty(event.date)) {
      yearEvents[event.date] = {};
    }

    const dateEvents = yearEvents[event.date];

    dateEvents[event.type] = _.isString(event.text) ? [event.text] : event.text;
  });

  return organizedEvents;
};

export const eventsByYear = organizeEventsByYearAndDate(events);
