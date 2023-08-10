/* eslint-disable no-unused-vars */
export interface LessonListDrawerInt {
  open: boolean;
  mobileOpen: boolean;
  window?: () => Window;
  handleMobileDrawerToggle: () => void;
}
export declare type LessonListDrawerFunc = (
  props: LessonListDrawerInt
) => JSX.Element;
export declare type LessonListFunc = () => JSX.Element;

export declare type LessonPlayerFunc = (props: {
  description: string;
  learnings: string[];
}) => JSX.Element;
export declare type DiscussionSectionFunc = () => JSX.Element;
export declare type VideoPlayerPagePageFunc = () => JSX.Element;
