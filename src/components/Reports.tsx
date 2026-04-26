import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { 
  FileDown, 
  ChevronDown, 
  TrendingUp, 
  Landmark, 
  Sparkles, 
  ChevronRight,
  BrainCircuit,
  MessageSquareText
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn, formatCurrency } from "../lib/utils";
import { Transaction } from "../types";

const PROFIT_DATA = [
  { month: "JAN", profit: 15000 },
  { month: "FEB", profit: 12000 },
  { month: "MAR", profit: 35000 },
  { month: "APR", profit: 85000 },
  { month: "MAY", profit: 25000 },
  { month: "JUN", profit: 75000 },
];

const EXPENSE_CATEGORIES = [
  { name: "Inventory", amount: 320000, percentage: 70 },
  { name: "Rent & Utilities", amount: 110000, percentage: 25 },
  { name: "Staff Salary", amount: 164000, percentage: 40 },
];

interface ReportsProps {
  transactions: Transaction[];
}

export default function Reports({ transactions }: ReportsProps) {
  const [period, setPeriod] = useState<string>("Monthly");
  const [isGenerating, setIsGenerating] = useState(false);
  const [insight, setInsight] = useState<string | null>(null);

  const generateInsights = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setInsight("Your net profit increased by 12% this month, primarily driven by a 20% surge in retail sales during the April festive season. However, inventory costs are 15% higher than average. We recommend negotiating bulk rates with 'Arpico' to optimize margins.");
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="p-4 pb-12 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-2xl text-on-surface">Financial Reports</h2>
        <button className="flex items-center gap-2 bg-primary-container text-white px-4 py-2 rounded-xl font-bold text-xs shadow-md active:scale-95 transition-transform">
          <FileDown className="w-4 h-4" />
          Export PDF
        </button>
      </div>

      {/* Period Tabs */}
      <div className="bg-surface-container-high p-1 rounded-xl flex">
        {["Daily", "Monthly", "Yearly"].map((p) => (
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

      {/* Main Stats Card */}
      <div className="bg-white p-6 rounded-xl border border-surface-container-highest shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
        <p className="text-xs font-bold text-on-surface-variant mb-1">Net Profit</p>
        <div className="flex items-baseline gap-2">
          <span className="font-display font-bold text-3xl text-primary">{formatCurrency(248500)}</span>
          <span className="text-[12px] text-primary flex items-center font-bold">
            <TrendingUp className="w-3 h-3 mr-1" /> 12%
          </span>
        </div>

        {/* Mini chart placeholder visual */}
        <div className="h-16 w-full mt-6 flex items-end gap-1.5">
          {[40, 60, 45, 70, 100, 55, 85].map((h, i) => (
            <motion.div 
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "flex-1 rounded-t-md",
                i === 4 ? "bg-primary-container" : "bg-primary-container/20"
              )}
            />
          ))}
        </div>
      </div>

      {/* AI Insights Card */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-primary/20 shadow-sm p-6 space-y-4">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4" />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-on-surface">AI Insights</h3>
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Powered by Gemini</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!insight ? (
            <motion.div 
              key="cta"
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-4"
            >
              <p className="text-sm font-medium text-on-surface-variant">Analyze your business performance with detailed AI-powered insights.</p>
              <button 
                onClick={generateInsights}
                disabled={isGenerating}
                className="w-full h-12 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing Data...
                  </>
                ) : (
                  <>
                    <BrainCircuit className="w-4 h-4" />
                    Generate Insight
                  </>
                )}
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="insight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex gap-3 text-sm font-medium text-on-surface-variant leading-relaxed">
                <MessageSquareText className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <p>{insight}</p>
              </div>
              <button 
                onClick={() => setInsight(null)}
                className="text-xs font-bold text-primary hover:underline"
              >
                Refresh Analysis
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Secondary Metric Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl border border-surface-container-highest shadow-sm">
          <p className="text-[11px] font-bold text-on-surface-variant uppercase mb-1">Total Income</p>
          <p className="font-display font-bold text-xl text-primary">Rs. 842k</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-surface-container-highest shadow-sm">
          <p className="text-[11px] font-bold text-on-surface-variant uppercase mb-1">Total Expenses</p>
          <p className="font-display font-bold text-xl text-tertiary">Rs. 594k</p>
        </div>
      </div>

      {/* Loan Highlight */}
      <div className="bg-secondary-container p-6 rounded-2xl border border-surface-container-highest">
         <div className="flex justify-between items-start mb-4">
           <div>
             <h3 className="font-bold text-on-surface-variant text-sm mb-1">Loan Outstanding</h3>
             <p className="font-display font-bold text-2xl text-on-surface">{formatCurrency(1250000)}</p>
           </div>
           <div className="p-3 bg-white/40 backdrop-blur-md rounded-full shadow-inner">
             <Landmark className="w-6 h-6 text-secondary" />
           </div>
         </div>
         <div className="space-y-3">
           <div className="flex justify-between text-xs font-bold text-on-surface-variant">
             <span>Repayment Progress</span>
             <span className="text-on-surface">65%</span>
           </div>
           <div className="h-2.5 w-full bg-white/30 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: "65%" }}
               transition={{ duration: 1, ease: "easeOut" }}
               className="h-full bg-secondary rounded-full"
             />
           </div>
         </div>
      </div>

      {/* Expense Categories Chart */}
      <section className="bg-white p-6 rounded-2xl border border-surface-container-highest shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-display font-bold text-lg">Expenses by Category</h3>
          <button className="p-1.5 text-on-surface-variant hover:bg-surface-container rounded-lg">
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-6">
          {EXPENSE_CATEGORIES.map((cat, i) => (
            <div key={cat.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-bold text-on-surface">{cat.name}</span>
                <span className="text-on-surface-variant font-medium">{formatCurrency(cat.amount)}</span>
              </div>
              <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${cat.percentage}%` }}
                  transition={{ delay: i * 0.1 }}
                  className={cn(
                    "h-full rounded-full",
                    i === 0 ? "bg-tertiary" : "bg-tertiary-container"
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Profit Trends Line Chart */}
      <section className="bg-white p-6 rounded-2xl border border-surface-container-highest shadow-sm">
        <h3 className="font-display font-bold text-lg mb-8">Profit Trend</h3>
        <div className="h-48 w-full -mx-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={PROFIT_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00875a" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#00875a" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#eaefe9" strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: '#6e7a71' }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: '#6e7a71' }}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="profit" 
                stroke="#00875a" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorProfit)" 
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}

