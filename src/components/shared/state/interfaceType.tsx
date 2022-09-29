import { ErrorResponseInt } from "@src/utils/interface";

/* eslint-disable no-unused-vars */
export interface ErrorPageInt {
  error: ErrorResponseInt;
}
export interface EmptyPageInt {
  href?: string;
  title?: string;
  message?: string;
  buttonText?: string;
  error?: ErrorResponseInt;
}

export declare type ErrorPageFunc = (props: ErrorPageInt) => JSX.Element;
