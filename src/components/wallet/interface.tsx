export interface TransactionHistory {
  amount: number;
  reference: string;
  createdAt: string;
  balance: number;
  currency: string;
  narration: string;
  type: "CREDIT" | "DEBIT" | "all";
}
