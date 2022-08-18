export interface WrapperInt {
  children: JSX.Element;
  title: string;
  description: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

export declare type WrapperFunc = (pros: WrapperInt) => JSX.Element