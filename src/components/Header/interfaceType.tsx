export interface HideOnScrollInt {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

export declare type HeaderFunc = (props: HideOnScrollInt) => JSX.Element;
export declare type HideOnScrollFunc = (props: HideOnScrollInt) => JSX.Element;
