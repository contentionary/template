import { UserInt } from "@src/utils/interface";

export interface HeaderProps {
  user: UserInt;
}
export declare type HeaderFunc = (props: HeaderProps) => JSX.Element;
