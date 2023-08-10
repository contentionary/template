/* eslint-disable no-unused-vars */
import { ExamInt } from "@src/utils/interface";

export declare type ExamInstructionsFunc = (props: {
  exam: ExamInt;
  auth: {
    isCentreManager: boolean;
    isPublicationSubscriber: boolean;
    isCentreSubscriber: boolean;
  };
}) => JSX.Element;
