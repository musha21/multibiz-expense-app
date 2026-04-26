import { Languages, Check, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { useState } from "react";

interface LanguageSelectionProps {
  onComplete: () => void;
}

export default function LanguageSelection({ onComplete }: LanguageSelectionProps) {
  const [selected, setSelected] = useState("EN");

  const languages = [
    { code: "EN", name: "English", sub: "Primary Language", native: "English" },
    { code: "SI", name: "සිංහල", sub: "Sinhala", native: "Sinhala" },
    { code: "TA", name: "தமிழ்", sub: "Tamil", native: "Tamil" },
  ];

  return (
    <div className="p-4 pt-12 max-w-lg mx-auto min-h-screen flex flex-col">
      <section className="mb-12 text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-[24px] bg-secondary-container shadow-inner">
          <Languages className="w-10 h-10 text-secondary" />
        </div>
        <div className="space-y-2">
          <h2 className="font-display font-bold text-3xl text-on-surface tracking-tight">Choose Language</h2>
          <p className="text-on-surface-variant font-medium opacity-80 leading-relaxed">
            Select your preferred language to continue with your bookkeeping.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 flex-grow">
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected(lang.code)}
            className={cn(
              "flex items-center justify-between p-6 rounded-[24px] border shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all relative overflow-hidden",
              selected === lang.code 
                ? "bg-white border-primary-container ring-2 ring-primary-container ring-opacity-10" 
                : "bg-white border-surface-container-highest hover:border-primary-container/30"
            )}
          >
            <div className="flex flex-col items-start z-10">
              <span className="font-display font-bold text-2xl text-on-surface">{lang.name}</span>
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mt-1 opacity-60">
                {lang.sub}
              </span>
            </div>
            
            <div className={cn(
              "w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors z-10",
              selected === lang.code ? "bg-primary-container border-primary-container" : "border-surface-container-highest bg-surface"
            )}>
              {selected === lang.code && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
            </div>
          </motion.button>
        ))}
      </div>

      <div className="mt-8 opacity-40 flex justify-center">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuaHhW9msBeBhPW73o7ot2LNnDB39KwoRugg29pJXQljD_BYX4FSZkA6COs1zZ5E3_4j_b1lxf1eqCknikaa5KpY7wPz2WuPIJDazZAsjLMfBderjJQ2WxJskBzRSd4y-ZEFH2AyCil-tA_Xz7vkHpZZiLHY7IlTJa0YCIfUaLO5pc6k3vmVHJuMjWGbRfi9ET6XdvQzCQgiD8ebkM3V_OQhiAX-5MQpisvYnFAtSJ06kqu9KhtOfGzCplbSp557SRwMk545te6I0A" 
          alt="Illustration" 
          className="w-full h-40 object-cover rounded-3xl"
        />
      </div>

      <div className="py-8">
        <button 
          onClick={onComplete}
          className="w-full h-16 bg-primary-container text-white font-display font-bold text-lg rounded-2xl shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
        >
          Continue
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
