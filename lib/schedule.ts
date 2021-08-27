import _ from "lodash";
import { ScheduleType } from "types/schedule";
import events from "data/schedule.json";

// Sort the events list by date
events.sort((a, b) => (a.date > b.date ? 1 : -1));

export const lectureNumberByDate = events
  .filter((evt) => evt.type === ScheduleType.Lecture)
  .reduce((acc, evt, index) => {
    acc[evt.date] = index + 1;

    return acc;
  }, {});

const organizeEventsByDate = (events) => {
  const eventsByDate = {};

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
