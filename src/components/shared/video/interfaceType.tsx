import React from "react";

/* eslint-disable no-unused-vars */
export interface VideoModalInt {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// eslint-disable-next-line no-unused-vars
export declare type VideoModalFunc = (props: VideoModalInt) => JSX.Element;
