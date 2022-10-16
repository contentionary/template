import { ReviewInt } from "@src/utils/interface";

export interface ReviewFormInt {
  id: string;
  subscribed: boolean;
  allowRating: boolean;
  cancelReplyForm?: () => void;
  review?: ReviewInt | undefined;
  action?: "create" | "edit" | undefined;
  query?: "reviews" | "replies" | undefined;
}

export interface ReviewItemInt {
  reply?: boolean;
  review: ReviewInt;
  openReply?: string;
  subscribed: boolean;
  // eslint-disable-next-line no-unused-vars
  handleToggleReply?: (discussion: string) => void;
}
