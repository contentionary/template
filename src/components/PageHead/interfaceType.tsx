export interface HeadInt {
  description: string;
  title: string;
  image?: string;
  googleCode?: string;
  domain?: string;
}

// eslint-disable-next-line no-unused-vars
export declare type HeadFunc = (props: HeadInt) => JSX.Element;
