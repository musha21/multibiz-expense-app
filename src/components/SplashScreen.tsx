import { motion } from "motion/react";
import { Wallet } from "lucide-react";

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 bg-surface flex flex-col items-center justify-center overflow-hidden">
      {/* Background patterns */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary-container/5 rounded-full blur-3xl" />
      
      <div className="relative flex flex-col items-center text-center space-y-8 max-w-md w-full px-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative"
        >
          {/* Logo container */}
          <div className="w-24 h-24 bg-primary-container rounded-[24px] flex items-center justify-center shadow-lg shadow-primary-container/20">
            <Wallet className="text-white w-12 h-12" />
          </div>
          
          {/* Accent icon */}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-surface-container-highest rounded-full flex items-center justify-center shadow-sm border border-surface-container-highest"
          >
            <div className="w-4 h-4 bg-primary-container rounded-full flex items-center justify-center">
               <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          </motion.div>
        </motion.div>

        <div className="space-y-2">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-display font-bold text-3xl text-on-surface tracking-tight"
          >
            Lankan Business Ledger
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-on-surface-variant max-w-[280px] mx-auto opacity-80 leading-relaxed font-medium"
          >
            Clear bookkeeping for the industrious Sri Lankan business owner.
          </motion.p>
        </div>

        <div className="w-full pt-12 flex flex-col items-center space-y-4">
          <div className="w-48 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-full w-full bg-primary-container rounded-full"
            />
          </div>
          <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold tracking-[0.2em] opacity-60">
            Initializing Ledger...
          </span>
        </div>
      </div>

      <footer className="absolute bottom-8 flex flex-col items-center space-y-2 opacity-60">
        <div className="flex items-center gap-2">
          {/* Placeholder for SL flag icon style */}
          <div className="w-4 h-2.5 bg-tertiary-container rounded-sm" />
          <span className="text-[12px] font-medium text-on-surface-variant">
            Crafted for Professional Merchants
          </span>
        </div>
      </footer>
    </div>
  );
}
