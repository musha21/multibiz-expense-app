import { useState } from "react";
import { Search, SlidersHorizontal, ChevronRight, ArrowDownRight, ArrowUpRight, Landmark, ReceiptText, Plus } from "lucide-react";
import { motion } from "motion/react";
import { cn, formatCurrency } from "../lib/utils";
import { Transaction, TransactionType, TransactionStatus } from "../types";
import { TransactionItem } from "./Dashboard";

interface TransactionsProps {
  transactions: Transaction[];
}

export default function Transactions({ transactions }: TransactionsProps) {
  const [filter, setFilter] = useState<string>("All");
  const [period, setPeriod] = useState<string>("Today");

  const filterTypes = ["All", "Income", "Expense", "Loan"];
  const periods = ["Today", "Month", "Year"];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-2xl text-on-surface">Transactions</h2>
        <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full">
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        {/* Type Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {filterTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={cn(
                "px-5 py-2 rounded-full font-bold text-xs whitespace-nowrap transition-all active:scale-95",
                filter === type 
                  ? "bg-primary-container text-white shadow-md" 
                  : "bg-surface-container-high text-on-surface-variant border border-surface-container-highest"
              )}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Period Filter */}
        <div className="flex p-1 bg-surface-container-highest rounded-xl">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                "flex-1 py-2 text-center text-xs font-bold rounded-lg transition-all",
                period === p ? "bg-white text-primary shadow-sm" : "text-on-surface-variant"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl border border-surface-container-highest shadow-sm">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">Daily Income</p>
          <p className="font-display font-bold text-xl text-primary">{formatCurrency(45200)}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-surface-container-highest shadow-sm">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">Daily Expense</p>
          <p className="font-display font-bold text-xl text-error">{formatCurrency(12850)}</p>
        </div>
      </div>

      {/* Transaction List */}
      <section className="space-y-3">
        <h3 className="text-[11px] font-bold text-on-surface-variant uppercase tracking-[0.15em] px-1">
          Recent Transactions
        </h3>
        <div className="space-y-3">
          {transactions.map((t) => (
            <motion.div 
              key={t.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl border border-surface-container-highest shadow-sm overflow-hidden"
            >
               <TransactionItem transaction={t} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Export Action */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-primary-container text-white rounded-2xl shadow-xl flex items-center justify-center active:scale-90 transition-all z-40">
        <Plus className="w-8 h-8" />
      </button>
    </div>
  );
}
