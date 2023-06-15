import {
  ExamInt,
  CourseInt,
  LeagueInt,
  PublicationCardProps,
} from "@src/utils/interface";

/* eslint-disable no-unused-vars */
export interface CourseCardInt {
  course: CourseInt;
}
/* eslint-disable no-unused-vars */
export interface LeagueCardInt {
  league: LeagueInt;
  folderId?: string;
}
export interface PublicationCardInt {}

export declare type CourseCardFunc = (props: CourseCardInt) => JSX.Element;
export declare type LeagueCardFunc = (props: LeagueCardInt) => JSX.Element;

export declare type PublicationCardFunc = (
  props: PublicationCardProps
) => JSX.Element;

export declare type ExamCardFunc = (props: {
  exam: ExamInt;
  leagueId?: string;
}) => JSX.Element;
