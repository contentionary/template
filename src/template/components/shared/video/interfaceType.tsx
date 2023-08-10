import React from "react";

/* eslint-disable no-unused-vars */
export interface VideoModalInt {
  isOpen: boolean;
  src: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export declare type VideoPlayerFunc = () => JSX.Element;
// eslint-disable-next-line no-unused-vars
export declare type VideoModalFunc = (props: VideoModalInt) => JSX.Element;
