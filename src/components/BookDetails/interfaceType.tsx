/* eslint-disable no-unused-vars */
import { CachedCentreInt, PublicationInt } from "@src/utils/interface";

export declare type BookDetailsPageFunc = (props: {
  publication: PublicationInt;
  centre: CachedCentreInt;
  auth: {
    isCentreManager: boolean;
    isPublicationSubscriber: boolean;
    isCentreSubscriber: boolean;
  };
  read: Record<string, any>;
}) => JSX.Element;
