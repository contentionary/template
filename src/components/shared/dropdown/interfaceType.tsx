import { ReactNode } from "react";

export interface NavbarMenuInt {
  children: JSX.Element;
  title: string;
  popupId?: string;
}

export interface DropdownMenuInt {
  title: ReactNode;
  children: ReactNode;
}

export declare type ImageButtonFunc = () => JSX.Element;
// eslint-disable-next-line no-unused-vars
export declare type NavbarMenuFunc = (props: NavbarMenuInt) => JSX.Element;
