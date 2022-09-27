import { PublicationInt } from "@src/utils/interface";

export declare type BookDetailsPageFunc = (props: {
  publication: PublicationInt;
  auth: {
    isCentreManager: boolean;
    isPublicationSubscriber: boolean;
    isCentreSubscriber: boolean;
  };
}) => JSX.Element;
