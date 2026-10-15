import React from 'react';
import { 
  Columns, 
  Smartphone, 
  Car, 
  Send, 
  ArrowRight, 
  CheckCircle2, 
  X,
  Sparkles
} from 'lucide-react';
import { useParkPing } from '../context/ParkPingContext';
import { ScannerExperience } from './ScannerExperience';
import { OwnerAlertFeed } from './OwnerAlertFeed';

export const SplitScreenSimulator = () => {
  const { simulatorMode, setSimulatorMode, selectedVehicle } = useParkPing();

  if (!simulatorMode) return null;

  return (
    <section className="px-4 lg:px-8 max-w-7xl mx-auto my-6 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="glass-panel p-4 rounded-3xl mb-6 flex items-center justify-between border-cyan-500/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
            <Columns className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-black text-white font-['Space_Grotesk'] flex items-center gap-2">
              <span>Interactive Dual-Device Simulator</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold">
                HACKATHON DEMO MODE
              </span>
            </div>
            <div className="text-xs text-slate-400">
              Test both perspectives simultaneously: Blocked driver (Left) vs Car Owner (Right)
            </div>
          </div>
        </div>

        <button
          onClick={() => setSimulatorMode(false)}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1.5"
        >
          <X className="w-4 h-4" />
          <span className="hidden sm:inline">Close Simulator</span>
        </button>
      </div>

      {/* The 2 Phone Mockups Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Device 1 (Left): Blocked Driver Phone View */}
        <div className="flex flex-col items-center">
          <div className="text-xs font-bold text-rose-400 mb-2 flex items-center gap-1.5">
            <Smartphone className="w-4 h-4" />
            <span>1. Blocked Driver (Windshield QR Scanned on Mobile)</span>
          </div>

          <div className="w-full max-w-sm rounded-[40px] border-[8px] border-slate-800 bg-[#080d1a] shadow-[0_0_50px_rgba(244,63,94,0.15)] overflow-hidden flex flex-col min-h-[580px] p-5">
            {/* Dynamic Island */}
            <div className="w-24 h-5 bg-black rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
            </div>

            <ScannerExperience isEmbedded={true} />
          </div>
        </div>

        {/* Device 2 (Right): Car Owner's Dashboard */}
        <div className="flex flex-col items-center">
          <div className="text-xs font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
            <Smartphone className="w-4 h-4" />
            <span>2. Car Owner (Receiving Ping Alert in Real Time)</span>
          </div>

          <div className="w-full max-w-sm rounded-[40px] border-[8px] border-slate-800 bg-[#080d1a] shadow-[0_0_50px_rgba(16,185,129,0.15)] overflow-hidden flex flex-col min-h-[580px] p-5">
            {/* Dynamic Island */}
            <div className="w-24 h-5 bg-black rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </div>

            <OwnerAlertFeed isEmbedded={true} />
          </div>
        </div>

      </div>

    </section>
  );
};
