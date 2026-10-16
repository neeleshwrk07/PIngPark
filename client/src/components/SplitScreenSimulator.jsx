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
      <div className="glass-panel p-4 rounded-3xl mb-6 flex items-center justify-between border-amber-500/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold shadow-md shadow-amber-500/15">
            <Columns className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-black text-white font-['Space_Grotesk'] flex items-center gap-2">
              <span>Interactive Dual-Device Simulator</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono font-bold border border-amber-400/30">
                HACKATHON LIVE DEMO MODE
              </span>
            </div>
            <div className="text-xs text-slate-400">
              Test both sides on 1 laptop: Blocked Driver (Left) vs Car Owner (Right)
            </div>
          </div>
        </div>

        <button
          onClick={() => setSimulatorMode(false)}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
        >
          <X className="w-4 h-4" />
          <span className="hidden sm:inline">Close Simulator</span>
        </button>
      </div>

      {/* The 2 Phone Mockups Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Device 1 (Left): Blocked Driver Phone View */}
        <div className="flex flex-col items-center">
          <div className="text-xs font-bold text-amber-300 mb-2 flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>1. Blocked Driver (Windshield QR Scanned on Mobile)</span>
          </div>

          <div className="w-full max-w-sm rounded-[40px] border-[8px] border-slate-800 bg-[#090b12] shadow-[0_0_50px_rgba(245,158,11,0.18)] overflow-hidden flex flex-col min-h-[580px] p-5">
            {/* Dynamic Island */}
            <div className="w-24 h-5 bg-black rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
            </div>

            <ScannerExperience isEmbedded={true} />
          </div>
        </div>

        {/* Device 2 (Right): Car Owner's Dashboard */}
        <div className="flex flex-col items-center">
          <div className="text-xs font-bold text-yellow-300 mb-2 flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-yellow-400" />
            <span>2. Car Owner (Receives Real-Time Horn Siren Buzz)</span>
          </div>

          <div className="w-full max-w-sm rounded-[40px] border-[8px] border-slate-800 bg-[#090b12] shadow-[0_0_50px_rgba(234,179,8,0.18)] overflow-hidden flex flex-col min-h-[580px] p-5">
            {/* Dynamic Island */}
            <div className="w-24 h-5 bg-black rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
            </div>

            <OwnerAlertFeed isEmbedded={true} />
          </div>
        </div>

      </div>

    </section>
  );
};
