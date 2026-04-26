/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Home, 
  ReceiptText, 
  BarChart3, 
  Settings as SettingsIcon, 
  Plus, 
  ChevronRight, 
  Store, 
  Bell, 
  Search,
  Scan,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Landmark,
  Languages,
  ChevronDown
} from "lucide-react";
import { cn, formatCurrency } from "./lib/utils";
import { 
  ViewType, 
  Transaction, 
  TransactionType, 
  TransactionStatus,
  Business 
} from "./types";

// Views
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Reports from "./components/Reports";
import Settings from "./components/Settings";
import Scanner from "./components/Scanner";
import Portfolio from "./components/Portfolio";
import SplashScreen from "./components/SplashScreen";
import LanguageSelection from "./components/LanguageSelection";
import AddTransaction from "./components/AddTransaction";

const MOCK_BUSINESSES: Business[] = [
  {
    id: "1",
    name: "Galle Grocery Store",
    type: "Retail",
    location: "Main Street",
    monthlyProfit: 84250,
    profitGrowth: 12,
    logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDawGbFPzVp-GMn4pHZWOlyXVYGCKzWjgYblpaDjvMBKG3-r6DdBAo-U3s4Wh1IPGAhqYRUu3Bzk0dSnVh2M4BHWlGDayS1Wmju3RJQ-XAhl_d-kicbNunvC3_IEomDVAT1IijM7P0AEdDqP9ahmfzS_8_OZE_-hpF4w4qJcWzcz1NR53d3O0cqgN4ffWpbKyP_GnuX6RYhvxd7ASz8Php5F69JZgv-8jsl8TV5pAOaAqe0oD5iHM2G6DElB4vK7Du4Ty1X5tmoHieV"
  },
  {
    id: "2",
    name: "City Cafe",
    type: "Food & Beverage",
    location: "Downtown",
    monthlyProfit: 42900,
    profitGrowth: -3,
    logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsxTiCo_K_LEC1gM-8lcXLfDTRPpkNAL6FrdNJubFhKheVu0guuK6t4vvtfe5JhDfgq1pVzaGvvvWL3wFL_EXUO1lVIMoSDdR8FYVgqBotyZ4lDz6rvvu9HUZDvzQT_OkdPFU6lIguy-57fCiXLm1HGmS2URpbjXys_vQsjjVG3wPp2ptT6-VhHYnWaSMGXBSfJE17Jf_gNYDZCi841tTh0U9FfXuzKcIDxHqddK_C_Y-lM2M4tLLElHOarPfsVv_zzzLotL2xulL0"
  }
];

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    type: TransactionType.INCOME,
    category: "Sales Revenue",
    amount: 14200,
    date: "Today",
    time: "2:45 PM",
    description: "Kandy Branch Sales",
    status: TransactionStatus.PAID,
    merchant: "Retail"
  },
  {
    id: "2",
    type: TransactionType.EXPENSE,
    category: "Electricity Bill",
    amount: 8500,
    date: "Today",
    time: "11:20 AM",
    description: "CEB October",
    status: TransactionStatus.PAID
  },
  {
    id: "3",
    type: TransactionType.EXPENSE,
    category: "Logistics",
    amount: 45000,
    date: "Yesterday",
    time: "4:10 PM",
    description: "Arpico Logistics Supplier",
    status: TransactionStatus.PENDING,
    merchant: "Arpico"
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>("SPLASH");
  const [selectedBusiness, setSelectedBusiness] = useState<Business>(MOCK_BUSINESSES[0]);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);

  // Handle splash screen timing
  useEffect(() => {
    if (currentView === "SPLASH") {
      const timer = setTimeout(() => {
        setCurrentView("DASHBOARD");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case "DASHBOARD":
        return <Dashboard 
          transactions={transactions} 
          currentBusiness={selectedBusiness}
          onAction={(action) => setCurrentView(action)}
        />;
      case "TRANSACTIONS":
        return <Transactions transactions={transactions} />;
      case "REPORTS":
        return <Reports transactions={transactions} />;
      case "SETTINGS":
        return <Settings />;
      case "SCANNER":
        return <Scanner onComplete={(newExp) => {
          setTransactions([newExp, ...transactions]);
          setCurrentView("DASHBOARD");
        }} onCancel={() => setCurrentView("DASHBOARD")} />;
      case "PORTFOLIO":
        return <Portfolio 
          businesses={MOCK_BUSINESSES} 
          onSelect={(b) => {
            setSelectedBusiness(b);
            setCurrentView("DASHBOARD");
          }} 
        />;
      case "LANGUAGE":
        return <LanguageSelection onComplete={() => setCurrentView("SETTINGS")} />;
      case "ADD_TRANSACTION":
        return <AddTransaction 
          onSave={(t) => {
            setTransactions([t, ...transactions]);
            setCurrentView("DASHBOARD");
          }} 
          onCancel={() => setCurrentView("DASHBOARD")}
        />;
      default:
        return <Dashboard transactions={transactions} currentBusiness={selectedBusiness} />;
    }
  };

  if (currentView === "SPLASH") {
    return <SplashScreen />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-surface-container-highest shadow-sm px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCurrentView("PORTFOLIO")}
            className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden active:scale-95 transition-transform"
          >
            {selectedBusiness.logoUrl ? (
              <img src={selectedBusiness.logoUrl} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <Store className="text-white w-6 h-6" />
            )}
          </button>
          <div className="flex items-center gap-1 cursor-pointer" onClick={() => setCurrentView("PORTFOLIO")}>
            <h1 className="font-display font-semibold text-lg text-primary-container">
              {selectedBusiness.name}
            </h1>
            <ChevronDown className="w-4 h-4 text-on-surface-variant" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-16 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 h-20 bg-white border-t border-surface-container-highest shadow-lg flex items-around justify-between px-6 pb-2">
        <NavItem 
          active={currentView === "DASHBOARD"} 
          icon={<Home className="w-6 h-6" />} 
          label="Home" 
          onClick={() => setCurrentView("DASHBOARD")} 
        />
        <NavItem 
          active={currentView === "TRANSACTIONS"} 
          icon={<ReceiptText className="w-6 h-6" />} 
          label="Transactions" 
          onClick={() => setCurrentView("TRANSACTIONS")} 
        />
        <NavItem 
          active={currentView === "REPORTS"} 
          icon={<BarChart3 className="w-6 h-6" />} 
          label="Reports" 
          onClick={() => setCurrentView("REPORTS")} 
        />
        <NavItem 
          active={currentView === "SETTINGS" || currentView === "LANGUAGE"} 
          icon={<SettingsIcon className="w-6 h-6" />} 
          label="Settings" 
          onClick={() => setCurrentView("SETTINGS")} 
        />
      </nav>
    </div>
  );
}

function NavItem({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-1 min-w-[64px] transition-all",
        active ? "text-primary-container" : "text-on-surface-variant"
      )}
    >
      <div className={cn(
        "p-1 rounded-xl transition-all",
        active ? "bg-primary-container/10" : ""
      )}>
        {icon}
      </div>
      <span className="text-[11px] font-medium font-display">{label}</span>
      {active && <motion.div layoutId="nav-glow" className="w-1 h-1 bg-primary-container rounded-full" />}
    </button>
  );
}

