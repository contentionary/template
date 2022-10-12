import { ReviewInt } from "@src/utils/interface";

export interface ReviewFormInt {
  id: string;
  query?: string;
  subscribed: boolean;
  action?: "create" | "edit" | undefined;
  review?: ReviewInt | undefined;
  cancelReplyForm?: () => void;
}

export interface ReviewItemInt {
  reply?: boolean;
  review: ReviewInt;
  openReply?: string;
  subscribed: boolean;
  // eslint-disable-next-line no-unused-vars
  handleToggleReply?: (discussion: string) => void;
}
