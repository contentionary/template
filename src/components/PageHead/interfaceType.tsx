export interface HeadInt {
  description: string;
  title: string;
  image?: string;
}

export declare type HeadFunc = (props: HeadInt) => JSX.Element;
