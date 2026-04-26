import { useState } from "react";
import { 
  X, 
  CheckCircle, 
  Calendar, 
  LayoutGrid, 
  StickyNote, 
  Check, 
  Minus, 
  Plus, 
  Landmark, 
  ArrowLeft,
  ChevronDown
} from "lucide-react";
import { motion } from "motion/react";
import { cn, formatCurrency } from "../lib/utils";
import { 
  Transaction, 
  TransactionType, 
  TransactionStatus, 
  LoanDirection, 
  LoanType 
} from "../types";

interface AddTransactionProps {
  onSave: (transaction: Transaction) => void;
  onCancel: () => void;
}

export default function AddTransaction({ onSave, onCancel }: AddTransactionProps) {
  const [type, setType] = useState<TransactionType>(TransactionType.INCOME);
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Sales");
  const [date, setDate] = useState("2023-10-27");
  const [loanDir, setLoanDir] = useState<LoanDirection>(LoanDirection.TAKEN);

  const handleSave = () => {
    if (!amount) return;
    
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      category,
      amount: parseFloat(amount),
      date: "Today", // Mock formatting
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      description,
      status: TransactionStatus.PAID,
      ...(type === TransactionType.LOAN ? {
        loanDetails: {
          direction: loanDir,
          type: LoanType.CASH
        }
      } : {})
    };
    onSave(newTransaction);
  };

  return (
    <div className="flex flex-col bg-surface min-h-screen">
      <header className="h-16 bg-white border-b border-surface-container-highest px-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onCancel} className="p-2 -ml-2 text-on-surface-variant hover:bg-surface-container rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-display font-semibold text-lg text-on-surface">Add Transaction</h1>
        </div>
      </header>

      <div className="p-4 flex-grow space-y-6 max-w-lg mx-auto w-full">
        {/* Transaction Type Selector */}
        <div className="flex p-1.5 bg-surface-container-highest rounded-[20px] shadow-inner">
          {[TransactionType.INCOME, TransactionType.EXPENSE, TransactionType.LOAN].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={cn(
                "flex-1 py-3 px-2 rounded-xl text-xs font-bold transition-all",
                type === t 
                  ? "bg-white text-primary-container shadow-md" 
                  : "text-on-surface-variant"
              )}
            >
              {t.charAt(0) + t.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Amount Input */}
        <motion.div 
          layout
          className="bg-white rounded-[24px] p-8 border border-surface-container-highest shadow-sm text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-4">Amount</label>
          <div className="flex items-center justify-center">
            <span className="text-3xl font-display font-bold text-primary-container mr-2">Rs.</span>
            <input 
              autoFocus
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="text-4xl font-display font-bold text-on-surface bg-transparent border-none focus:ring-0 p-0 w-48 text-center placeholder:opacity-20"
            />
          </div>
        </motion.div>

        {/* Grid Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-on-surface-variant ml-1">Date</label>
            <div className="relative group">
              <input 
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-14 px-4 bg-white border border-surface-container-highest rounded-xl text-sm font-semibold focus:border-primary-container focus:ring-1 focus:ring-primary-container/20 transition-all outline-none"
              />
              <Calendar className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold text-on-surface-variant ml-1">Category</label>
            <div className="relative group">
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-14 px-4 bg-white border border-surface-container-highest rounded-xl text-sm font-semibold appearance-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/20 transition-all outline-none pr-10"
              >
                <option>Sales</option>
                <option>Services</option>
                <option>Stock</option>
                <option>Rent</option>
                <option>Other</option>
              </select>
              <ChevronDown className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" />
            </div>
          </div>
        </div>

        {/* Loan Specifics */}
        {type === TransactionType.LOAN && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="bg-surface-container-low rounded-[24px] p-6 border-2 border-dashed border-surface-container-highest space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-on-surface">Direction</span>
              <div className="flex bg-surface-container-highest p-1 rounded-xl">
                <button 
                  onClick={() => setLoanDir(LoanDirection.GIVEN)}
                  className={cn("px-4 py-2 rounded-lg text-xs font-bold transition-all", loanDir === LoanDirection.GIVEN ? "bg-white text-primary shadow-sm" : "text-on-surface-variant")}
                >
                  Given
                </button>
                <button 
                  onClick={() => setLoanDir(LoanDirection.TAKEN)}
                  className={cn("px-4 py-2 rounded-lg text-xs font-bold transition-all", loanDir === LoanDirection.TAKEN ? "bg-white text-primary shadow-sm" : "text-on-surface-variant")}
                >
                  Taken
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-on-surface-variant ml-1">Description</label>
          <div className="relative">
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What was this for?"
              rows={3}
              className="w-full p-4 bg-white border border-surface-container-highest rounded-xl text-sm font-semibold focus:border-primary-container focus:ring-1 focus:ring-primary-container/20 transition-all outline-none resize-none"
            />
            <StickyNote className="w-5 h-5 absolute right-4 top-4 pointer-events-none text-on-surface-variant/40" />
          </div>
        </div>

        {/* Quick Notes */}
        <div className="space-y-2 pb-8">
          <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Quick Notes</label>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
            {["Customer Payment", "Advance Received", "Cash Sale", "Shop Rent", "Personal"].map((note) => (
              <button 
                key={note}
                onClick={() => setDescription(note)}
                className="whitespace-nowrap px-4 py-2 bg-secondary-container/30 text-secondary border border-secondary-container text-[11px] font-bold rounded-full active:scale-95 transition-all"
              >
                {note}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Button stays above Bottom Nav via its fixed bottom in App.tsx or we position it relative here */}
      <div className="fixed bottom-24 left-0 right-0 px-4 max-w-lg mx-auto z-40">
        <button 
          onClick={handleSave}
          className="w-full h-16 bg-primary-container text-white font-display font-bold text-lg rounded-2xl shadow-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
        >
          <CheckCircle className="w-6 h-6" />
          Save Transaction
        </button>
      </div>
    </div>
  );
}
