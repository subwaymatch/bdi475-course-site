import _ from "lodash";
import { ScheduleType } from "types/schedule";
import events from "data/schedule.json";

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

const organizeEventsByDate = (events) => {
  const eventsByDate = {};

  console.log(`organizeEventsByDate`);
  console.log(events);

  events.forEach((event) => {
    if (!eventsByDate.hasOwnProperty(event.date)) {
      eventsByDate[event.date] = {};
    }

    const dateEvents = eventsByDate[event.date];

    dateEvents[event.type] = _.isString(event.text) ? [event.text] : event.text;
  });

  return eventsByDate;
};

export const eventsByDate = organizeEventsByDate(events);

console.log(`eventsByDate`);
console.log(eventsByDate);
