import { Plus, Minus, Landmark, Scan, ArrowUpRight, ArrowDownRight, Wallet, ReceiptText, ChevronRight, Store } from "lucide-react";
import { motion } from "motion/react";
import { cn, formatCurrency } from "../lib/utils";
import { Transaction, TransactionType, TransactionStatus, Business } from "../types";

interface DashboardProps {
  transactions: Transaction[];
  currentBusiness: Business;
  onAction: (action: any) => void;
}

export default function Dashboard({ transactions, currentBusiness, onAction }: DashboardProps) {
  const totalIncome = transactions
    .filter(t => t.type === TransactionType.INCOME)
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpense = transactions
    .filter(t => t.type === TransactionType.EXPENSE)
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalIncome - totalExpense;

  return (
    <div className="p-4 space-y-6">
      {/* Welcome Header */}
      <div className="space-y-1">
        <h2 className="font-display font-bold text-3xl text-on-surface">Hello, Kamal</h2>
        <p className="text-on-surface-variant font-medium">Manage your business portfolio and track performance today.</p>
      </div>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Main Net Profit Card */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="col-span-2 lg:col-span-4 bg-white p-6 rounded-xl border border-surface-container-highest shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col justify-between min-h-[160px]"
        >
          <div>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Net Profit</p>
            <h2 className="font-display font-bold text-3xl text-primary mt-2">
              {formatCurrency(netProfit)}
            </h2>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[12px] font-bold">
              <ArrowUpRight className="w-3 h-3" />
              {currentBusiness.profitGrowth}%
            </span>
            <span className="text-xs text-on-surface-variant italic">Since last month</span>
          </div>
        </motion.div>

        {/* Total Income */}
        <StatCard 
          label="Total Income" 
          value={formatCurrency(totalIncome)} 
          type="positive" 
          icon={<ArrowDownRight className="w-5 h-5" />} 
          bgColor="bg-primary/10"
          textColor="text-primary"
        />

        {/* Total Expense */}
        <StatCard 
          label="Total Expense" 
          value={formatCurrency(totalExpense)} 
          type="negative" 
          icon={<ArrowUpRight className="w-5 h-5" />} 
          bgColor="bg-error/10"
          textColor="text-error"
        />

        {/* Loan Balance - Placeholder */}
        <StatCard 
          label="Loan Balance" 
          value="Rs. 1.2M" 
          type="neutral" 
          icon={<Landmark className="w-5 h-5" />} 
          bgColor="bg-secondary-container/50"
          textColor="text-secondary"
        />

        {/* Cash Hand - Placeholder */}
        <StatCard 
          label="Cash Hand" 
          value="Rs. 15k" 
          type="neutral" 
          icon={<Wallet className="w-5 h-5" />} 
          bgColor="bg-surface-container-highest"
          textColor="text-on-surface-variant"
        />
      </div>

      {/* Quick Actions */}
      <section className="space-y-4">
        <h3 className="font-display font-bold text-xl text-on-surface">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-4">
          <ActionButton onClick={() => onAction("ADD_TRANSACTION")} icon={<Plus className="w-6 h-6" />} label="Add Income" colorClass="bg-primary-container text-white" />
          <ActionButton onClick={() => onAction("ADD_TRANSACTION")} icon={<Minus className="w-6 h-6" />} label="Add Expense" colorClass="bg-white border border-surface-container-highest text-error" />
          <ActionButton onClick={() => onAction("ADD_TRANSACTION")} icon={<Landmark className="w-6 h-6" />} label="Add Loan" colorClass="bg-white border border-surface-container-highest text-secondary" />
          <ActionButton onClick={() => onAction("SCANNER")} icon={<Scan className="w-6 h-6" />} label="Scan Bill" colorClass="bg-white border border-surface-container-highest text-on-surface-variant" />
        </div>
      </section>

      {/* Recent Transactions */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-xl text-on-surface">Recent Transactions</h3>
          <button onClick={() => onAction("TRANSACTIONS")} className="text-primary font-bold text-sm hover:underline">View All</button>
        </div>
        <div className="bg-white rounded-2xl border border-surface-container-highest overflow-hidden shadow-sm divide-y divide-surface-container-low">
          {transactions.slice(0, 5).map((t) => (
            <TransactionItem key={t.id} transaction={t} />
          ))}
        </div>
      </section>

      {/* Promo Card */}
      <motion.div 
        whileTap={{ scale: 0.98 }}
        onClick={() => onAction("REPORTS")}
        className="relative overflow-hidden bg-primary-container rounded-2xl p-6 text-white min-h-[140px] flex flex-col justify-end group cursor-pointer"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent opacity-50 group-hover:scale-110 transition-transform duration-700" />
        <Store className="absolute top-4 right-4 w-12 h-12 text-white/20" />
        <div className="relative z-10 space-y-1">
          <h4 className="font-display font-bold text-lg">In-depth Monthly Reports</h4>
          <p className="text-sm opacity-90 mb-3 max-w-[240px]">Analyze your business performance with detailed AI-powered insights.</p>
          <div className="bg-white text-primary-container px-4 py-1.5 rounded-full font-bold text-xs w-fit">
            Generate Now
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ label, value, icon, bgColor, textColor, type }: any) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-white p-4 rounded-xl border border-surface-container-highest shadow-sm active:scale-95 transition-all"
    >
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-3", bgColor, textColor)}>
        {icon}
      </div>
      <p className="text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">{label}</p>
      <p className={cn("font-bold text-lg", type === 'positive' ? 'text-primary' : type === 'negative' ? 'text-error' : 'text-on-surface')}>
        {value}
      </p>
    </motion.div>
  );
}

function ActionButton({ icon, label, colorClass, onClick }: any) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 group">
      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-md group-active:scale-90 transition-all", colorClass)}>
        {icon}
      </div>
      <span className="text-[10px] font-bold text-on-surface-variant text-center leading-tight">{label}</span>
    </button>
  );
}

export function TransactionItem({ transaction }: { transaction: Transaction }) {
  const isIncome = transaction.type === TransactionType.INCOME;
  
  return (
    <div className="flex items-center justify-between p-4 bg-white active:bg-surface-container-low transition-colors group cursor-pointer">
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center",
          isIncome ? "bg-primary/10 text-primary" : "bg-error/10 text-error"
        )}>
          {isIncome ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
        </div>
        <div>
          <p className="font-bold text-on-surface text-sm">{transaction.category}</p>
          <p className="text-[11px] text-on-surface-variant font-medium">
            {transaction.date}, {transaction.time} {transaction.merchant && `• ${transaction.merchant}`}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className={cn("font-bold text-sm", isIncome ? "text-primary" : "text-error")}>
          {isIncome ? "+" : "-"} {formatCurrency(transaction.amount)}
        </p>
        <span className={cn(
          "inline-block px-2 py-0.5 rounded-full text-[9px] font-bold uppercase mt-1",
          transaction.status === TransactionStatus.PAID ? "bg-primary/10 text-primary" : "bg-orange-100 text-orange-800"
        )}>
          {transaction.status}
        </span>
      </div>
    </div>
  );
}
