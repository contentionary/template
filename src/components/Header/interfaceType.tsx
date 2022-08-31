export interface HideOnScrollInt {
  window?: () => Window;
  children: React.ReactElement;
}

export declare type HeaderFunc = () => JSX.Element;
// eslint-disable-next-line no-unused-vars
export declare type HideOnScrollFunc = (props: HideOnScrollInt) => JSX.Element;
