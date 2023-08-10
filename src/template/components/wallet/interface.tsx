export interface TransactionHistory {
  amount: number;
  reference: string;
  createdAt: string;
  balance: number;
  currency: string;
  narration: string;
  type: "CREDIT" | "DEBIT" | "all";
}

export interface CurrencyType {
  name: string;
  abbr: string;
  country: string;
  flag: string;
  ios2: string;
  paymentService: object;
}
