/* eslint-disable no-unused-vars */
export interface HideOnScrollInt {
  window?: () => Window;
  children: React.ReactElement;
}
export interface AppDrawerInt {
  children: React.ReactElement;
}

export declare type HeaderFunc = () => JSX.Element;
export declare type AcademyHeaderFunc = () => JSX.Element;
export declare type PublicationsHeaderFunc = () => JSX.Element;
export declare type AppDrawerFunc = (props: AppDrawerInt) => JSX.Element;
export declare type HideOnScrollFunc = (props: HideOnScrollInt) => JSX.Element;
