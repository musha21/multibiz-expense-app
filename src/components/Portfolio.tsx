import { 
  Store, 
  Plus, 
  MoreVertical, 
  TrendingUp, 
  TrendingDown, 
  ChevronRight, 
  UtensilsCrossed, 
  Expand 
} from "lucide-react";
import { motion } from "motion/react";
import { cn, formatCurrency } from "../lib/utils";
import { Business } from "../types";

interface PortfolioProps {
  businesses: Business[];
  onSelect: (business: Business) => void;
}

export default function Portfolio({ businesses, onSelect }: PortfolioProps) {
  return (
    <div className="p-4 space-y-8">
      <div className="space-y-1">
        <h2 className="font-display font-bold text-3xl text-on-surface">My Businesses</h2>
        <p className="text-on-surface-variant font-medium">Manage your business portfolio and track performance today.</p>
      </div>

      <div className="space-y-4">
        {businesses.map((b) => (
          <motion.div 
            key={b.id}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-[24px] p-6 border border-surface-container-highest shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col gap-5 group cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-4 items-center">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  b.type === "Retail" ? "bg-secondary-container text-secondary" : "bg-tertiary-container/20 text-tertiary"
                )}>
                  {b.type === "Retail" ? <Store className="w-6 h-6" /> : <UtensilsCrossed className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-on-surface">{b.name}</h3>
                  <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">{b.type} • {b.location}</p>
                </div>
              </div>
              <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <div className="h-[1px] bg-surface-container-low w-full" />

            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold text-on-surface-variant mb-1 uppercase tracking-widest">This Month's Profit</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-bold text-xl text-primary-container">{formatCurrency(b.monthlyProfit)}</span>
                  <span className={cn(
                    "text-[10px] font-bold flex items-center gap-0.5 px-1.5 py-0.5 rounded-full",
                    b.profitGrowth >= 0 ? "text-primary bg-primary/10" : "text-error bg-error/10"
                  )}>
                    {b.profitGrowth >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(b.profitGrowth)}%
                  </span>
                </div>
              </div>
              <button 
                onClick={() => onSelect(b)}
                className="bg-primary-container text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-md group-hover:shadow-lg"
              >
                View
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}

        {/* Empty State / Add Card */}
        <button className="w-full bg-surface-container-low border-2 border-dashed border-surface-container-highest rounded-[24px] p-8 flex flex-col items-center justify-center text-center gap-4 active:scale-[0.98] transition-all">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-on-surface-variant shadow-sm border border-surface-container-highest">
            <Plus className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="font-display font-bold text-lg text-on-surface">Expanding?</h4>
            <p className="text-xs font-medium text-on-surface-variant max-w-[200px]">Register another business to track all your income in one place.</p>
          </div>
        </button>
      </div>

      {/* FAB Add */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-primary-container text-white rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-all z-40 transform hover:rotate-90">
        <Plus className="w-8 h-8" />
      </button>
    </div>
  );
}
