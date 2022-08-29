export interface HideOnScrollInt {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

export declare type HeaderFunc = () => JSX.Element;
// eslint-disable-next-line no-unused-vars
export declare type HideOnScrollFunc = (props: HideOnScrollInt) => JSX.Element;
