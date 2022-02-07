import dayjs from "dayjs";

export enum ScheduleType {
  Lecture = "LECTURE",
  NoLecture = "NO_LECTURE",
  Exercise = "EXERCISE",
  Quiz = "QUIZ",
  CaseStudy = "CASE_STUDY",
}

export interface ICalendarEvent {
  date: string;
  type: ScheduleType;
  title?: string;
  text?: string | string[];
  link?: string;
}

export interface ILectureNumberMap {
  [key: string]: number;
}

export interface IWeeklyDayjsObjectsByYear {
  [year: number]: Array<Array<dayjs.Dayjs | null>>;
}

export interface IYearAndWeek {
  year: number;
  week: number;
}

export interface IEventsByYear {
  [year: string]: {
    [dateStr: string]: ICalendarEvent[];
  };
}
