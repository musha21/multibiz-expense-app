import { useState, useRef, useEffect } from "react";
import { X, Flashlight, Image as ImageIcon, Camera, RefreshCw, Save, Info, ShoppingCart, Calendar, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn, formatCurrency } from "../lib/utils";
import { Transaction, TransactionType, TransactionStatus } from "../types";

interface ScannerProps {
  onComplete: (transaction: Transaction) => void;
  onCancel: () => void;
}

export default function Scanner({ onComplete, onCancel }: ScannerProps) {
  const [step, setStep] = useState<"CAMERA" | "REVIEW">("CAMERA");
  const [isFlashOn, setIsFlashOn] = useState(false);

  // Mock scan
  const handleCapture = () => {
    setStep("REVIEW");
  };

  const handleSave = () => {
    const mockExpense: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: TransactionType.EXPENSE,
      category: "Inventory & Stock",
      amount: 4250.00,
      date: "24 Oct 2023",
      time: "4:30 PM",
      description: "Fresh vegetable supply - Keells Supermarket",
      status: TransactionStatus.PAID,
      merchant: "Keells Supermarket"
    };
    onComplete(mockExpense);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black flex flex-col">
      {/* Header */}
      <header className="h-16 bg-white flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button onClick={onCancel} className="p-2 -ml-2 text-on-surface-variant hover:bg-surface-container rounded-full">
            <X className="w-6 h-6" />
          </button>
          <h1 className="font-display font-semibold text-lg text-on-surface">Scan Receipt</h1>
        </div>
        <button 
          onClick={() => setIsFlashOn(!isFlashOn)}
          className={cn("p-2 rounded-full transition-colors", isFlashOn ? "text-primary bg-primary/10" : "text-on-surface-variant")}
        >
          <Flashlight className="w-6 h-6" />
        </button>
      </header>

      <div className="flex-grow flex flex-col overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === "CAMERA" ? (
            <motion.div 
              key="camera"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-grow flex flex-col"
            >
              <div className="relative flex-grow bg-black flex flex-col items-center justify-center overflow-hidden">
                {/* Mock Camera Feed */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfbC_DRMEjatQZ37oIIwNLE9A5dQ1q0Cif5zcZND5w6yb3Nj6SpWkjtiTfCxeAeS8gr0YArdTEhPP3onPCaKLhlpLayKH1a6AQLt9DlOiUZSPSsYLWngRKK1NYjvNi1VJuFcTKutYa8fbU_i4fWibEgRtwV09EbMlI_BJLsVyoNrTv_JJNU9q42y6rycW5_TnsT-bR2a-VBIxfcFA1p-SLSxtpF1x9EZuT2ZnkcRgtck0TJc0SEE5SBfs-IVjCVNa5lhRX5LdbGgie" 
                    alt="Receipt on table" 
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Focus Guide */}
                <div className="relative z-10 w-4/5 aspect-[3/4] max-w-sm rounded-[32px] border-2 border-white/20 flex items-center justify-center pointer-events-none">
                  {/* Corner Markers */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-[32px]" />
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-[32px]" />
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-[32px]" />
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-[32px]" />
                </div>

                <div className="absolute bottom-12 z-20 flex flex-col items-center gap-10 w-full px-8">
                  <motion.p 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-white text-sm font-bold bg-black/40 backdrop-blur-md px-6 py-2.5 rounded-full"
                  >
                    Position receipt within the frame
                  </motion.p>
                  
                  <div className="flex items-center justify-between w-full max-w-xs">
                    <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 active:scale-90 transition-transform">
                      <div className="w-10 h-10 bg-surface-container-highest rounded-lg overflow-hidden">
                         <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrGYM1xtx41xy7zKP7g6xvQeztPvissAwWcrv5y3XYCeOliq0ieHpZB-xBU4EzzMRQliiF76Wm5LGu3Sn5KuhKXYumlpeYkwGLNhdxQ290PpZxAdTd81UuPgoq8a4qmHB1rLojSoSB2IsJSI4v3ILFEHkQyq-LRn8vrm4w1MVwiDfhhaBY90Evl1Fxej6Wbi-HXyNb6UCNUgEZwBBv_R7jHpLxPvIsJqmPiXylXlEtODnDqePkL04xYsnA__rjGvyi37xTECAV_UUR" className="w-full h-full object-cover" />
                      </div>
                    </button>
                    
                    <button 
                      onClick={handleCapture}
                      className="w-20 h-20 bg-white rounded-full p-1.5 shadow-2xl active:scale-90 transition-all group"
                    >
                      <div className="w-full h-full border-4 border-primary-container rounded-full flex items-center justify-center">
                        <div className="w-14 h-14 bg-primary-container rounded-full" />
                      </div>
                    </button>
                    
                    <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 active:scale-90 transition-transform">
                      <ImageIcon className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="review"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              className="flex-grow flex flex-col bg-surface p-4 space-y-6"
            >
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-surface-container-highest shadow-sm">
                <div className="w-16 h-16 bg-surface-container-high rounded-xl overflow-hidden flex-shrink-0">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuClclFfsX1x3My5AGGe-cLGwrnS4BBznZtePdcOzTMvvlDHwQUt7KWXp4E00nWr-LrzQlpD-ZKpPCWGGPMkB2WzjMDpaDavNVjYlsvCdFOCbuHe_I9hUNcwUrB_uqerfn9bRXc0lItf4vrf0Q5r0mKMsAo1jQ6evpcHt9R8ezsNppanpf5Plw2cqdGdntI5duNf9_wAwsOXKOIlvB0RXZEvfKTvcP3F2-YM7sF774Q2HPXV6gYR2-qgdjETD9pPdpWNvCc6kU1sKZ6p" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-on-surface">Review Details</h3>
                  <p className="text-xs font-medium text-on-surface-variant">OCR extracted 4 items successfully</p>
                </div>
              </div>

              <div className="space-y-4">
                <EditableField icon={<p className="font-display font-bold text-xl text-primary">Rs.</p>} label="Amount" value="4,250.00" />
                <EditableField icon={<Calendar className="w-5 h-5 text-primary" />} label="Date" value="24 Oct 2023" />
                <EditableField icon={<ShoppingCart className="w-5 h-5 text-primary" />} label="Category" value="Inventory & Stock" />
                
                <div className="bg-white p-4 rounded-xl border border-surface-container-highest shadow-sm flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase">Description</label>
                  <p className="text-sm font-medium text-on-surface">Fresh vegetable supply for the week - Keells Supermarket, Colombo 03</p>
                </div>
              </div>

              {/* Accuracy Note */}
              <div className="bg-primary/5 p-4 rounded-xl flex items-start gap-3 border border-primary/20">
                <Info className="w-5 h-5 text-primary-container-variant" />
                <p className="text-xs font-medium text-primary-container-variant leading-relaxed">
                  Accuracy is high. We detected the merchant as "Keells Supermarket". Double check the amount before saving.
                </p>
              </div>

              {/* Footer Actions */}
              <div className="pt-4 flex flex-col gap-3">
                <button 
                  onClick={handleSave}
                  className="w-full h-16 bg-primary-container text-white font-display font-bold text-lg rounded-2xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all"
                >
                  <Save className="w-6 h-6" />
                  Save Expense
                </button>
                <button 
                  onClick={() => setStep("CAMERA")}
                  className="w-full h-14 bg-white text-on-surface border border-surface-container-highest font-bold rounded-2xl flex items-center justify-center gap-2 active:bg-surface-container transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                  Retake Photo
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function EditableField({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-surface-container-highest shadow-sm flex flex-col gap-2">
      <label className="text-[10px] font-bold text-on-surface-variant uppercase">{label}</label>
      <div className="flex items-center gap-3">
        {icon}
        <p className="font-display font-bold text-xl text-on-surface">{value}</p>
      </div>
    </div>
  );
}
