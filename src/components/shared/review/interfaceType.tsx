import { ReviewInt } from "@src/utils/interface";

export interface ReviewFormInt {
  id: string;
  query?: string;
  subscribed: boolean;
}

export interface ReviewItemInt {
  reply?: boolean;
  review: ReviewInt;
  openReply?: string;
  subscribed: boolean;
  // eslint-disable-next-line no-unused-vars
  handleToggleReply?: (discussion: string) => void;
}
