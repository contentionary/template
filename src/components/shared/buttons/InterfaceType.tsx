/* eslint-disable no-unused-vars */
export interface ImageButtonInt {
  alt: string;
  src: string;
  onClick?: () => void;
  children: React.ReactElement;
}

export interface ImageLinkInt extends ImageButtonInt {
  href: string;
}

export declare type BaseButtonFunc = () => JSX.Element;
export declare type ImageLinkFunc = (props: ImageLinkInt) => JSX.Element;
export declare type ImageButtonFunc = (props: ImageButtonInt) => JSX.Element;
