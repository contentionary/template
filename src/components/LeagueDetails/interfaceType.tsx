/* eslint-disable no-unused-vars */
import { LeagueInt } from "@src/utils/interface";

export declare type LeagueDetailsPageFunc = (props: {
  league: LeagueInt;
  auth: {
    isCentreManager: boolean;
    isCentreSubscriber: boolean;
    isLeagueSubscriber: boolean;
  };
  read: Record<string, any>;
}) => JSX.Element;
