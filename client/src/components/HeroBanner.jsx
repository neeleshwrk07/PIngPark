import React from 'react';
import { 
  ShieldCheck, 
  Car, 
  QrCode, 
  PhoneCall, 
  MessageSquare, 
  Sparkles, 
  Clock, 
  ArrowRight,
  Columns,
  AlertTriangle
} from 'lucide-react';
import { useParkPing } from '../context/ParkPingContext';

export const HeroBanner = () => {
  const { openModal, openScannerForVehicle, selectedVehicle, simulatorMode, setSimulatorMode } = useParkPing();

  return (
    <section className="pt-6 pb-6 px-4 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Double-Parking Solution • Privacy Shield • Instant Windshield QR</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Zero App Required for Scanner</span>
          <span className="text-slate-600">•</span>
          <span>Direct Call & WhatsApp Ready</span>
        </div>
      </div>

      {/* Main Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
        
        <div className="lg:col-span-8 space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight font-['Space_Grotesk'] text-white">
            Never Get Trapped by a <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-300 bg-clip-text text-transparent">
              Blocked Car Again.
            </span>
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            When you have to double-park in a crowded lot, mall, or apartment, don't leave your phone number scribbled on paper for creeps to copy. Stick your smart <strong>ParkPing Windshield Decal</strong> on your car. If someone needs you to move, they scan your QR to call, WhatsApp, or instant-ping you in seconds.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => openModal('registerVehicle')}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <QrCode className="w-4 h-4 text-slate-950" />
              <span>Get Your Windshield QR Decal</span>
            </button>

            {selectedVehicle && (
              <button
                onClick={() => openScannerForVehicle(selectedVehicle)}
                className="px-5 py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-cyan-300 font-bold text-xs transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>Simulate Windshield Scan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={() => setSimulatorMode(!simulatorMode)}
              className="px-4 py-3 rounded-2xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 font-bold text-xs transition-all flex items-center gap-2"
            >
              <Columns className="w-4 h-4" />
              <span>{simulatorMode ? 'Exit Split Simulator' : 'Split-Screen Live Demo'}</span>
            </button>
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div className="lg:col-span-4 space-y-3">
          <div className="glass-card p-4 rounded-2xl border-emerald-500/20 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">Direct Call & WhatsApp</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Blocked driver scans with default camera and taps to ring or message owner.
              </div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl border-cyan-500/20 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">Privacy Phone Masking</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Choose to hide your raw mobile number and receive in-app emergency buzzer pings.
              </div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl border-amber-500/20 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">Real-Time "On My Way" Replies</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Tap 1 button from your phone: "Coming down in 2 mins!" so the blocked driver relaxes.
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
