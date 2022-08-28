export interface WrapperInt {
  children: JSX.Element;
  title: string;
  description: string;
  image?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

export declare type WrapperFunc = (props: WrapperInt) => JSX.Element