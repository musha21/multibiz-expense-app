export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
  LOAN = "LOAN"
}

export enum TransactionStatus {
  PAID = "PAID",
  PENDING = "PENDING"
}

export enum LoanDirection {
  GIVEN = "GIVEN",
  TAKEN = "TAKEN"
}

export enum LoanType {
  CASH = "CASH",
  PRODUCT = "PRODUCT"
}

export interface Transaction {
  id: string;
  type: TransactionType;
  category: string;
  amount: number;
  date: string;
  description: string;
  status: TransactionStatus;
  time: string;
  merchant?: string;
  loanDetails?: {
    direction: LoanDirection;
    type: LoanType;
  };
}

export interface Business {
  id: string;
  name: string;
  type: string;
  location: string;
  logoUrl?: string;
  monthlyProfit: number;
  profitGrowth: number;
}

export type ViewType = "DASHBOARD" | "TRANSACTIONS" | "REPORTS" | "SETTINGS" | "SCANNER" | "PORTFOLIO" | "SPLASH" | "LANGUAGE" | "ADD_TRANSACTION";
