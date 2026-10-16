import React from 'react';
import { 
  ShieldCheck, 
  Car, 
  QrCode, 
  Camera,
  PhoneCall, 
  MessageSquare, 
  Sparkles, 
  Clock, 
  ArrowRight,
  BellRing,
  CheckCircle2,
  Zap
} from 'lucide-react';
import { useParkPing } from '../context/ParkPingContext';

export const HeroBanner = ({ onSelectTab }) => {
  const { openModal, openScannerForVehicle, selectedVehicle, vehicles } = useParkPing();

  return (
    <section className="pt-6 pb-4 px-4 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>The Smart Windshield QR Platform • Never Get Trapped Behind A Double-Parked Car</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          <span>Zero App Download for Scanner</span>
          <span className="text-slate-600">•</span>
          <span>100% Phone Privacy Shield</span>
        </div>
      </div>

      {/* Main Clean Headline */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight font-['Space_Grotesk'] text-white">
          Someone Parked In Front of You? <br />
          <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
            Scan Their Windshield QR & Move Them Fast.
          </span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
          No scribbled phone numbers on paper. No awkward honking for hours. Stick your smart PingPark decal on your glass so blocked drivers can buzz or reach you in seconds.
        </p>
      </div>

      {/* THE TWO MAIN HERO FEATURE CARDS: Scan Registered QR vs Register My Vehicle */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch mb-8">
        
        {/* CARD 1: SCAN REGISTERED CAR QR (For Blocked Drivers) */}
        <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#161208] to-[#0c0d14] border-2 border-amber-400/40 hover:border-amber-400 shadow-2xl shadow-amber-500/10 transition-all group flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-bold">
                <Camera className="w-3.5 h-3.5 text-amber-400" />
                <span>FOR BLOCKED DRIVERS</span>
              </span>
              <span className="text-xs text-amber-400/80 font-mono font-semibold">Zero-App Instant Scan</span>
            </div>

            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/30 shrink-0 group-hover:scale-105 transition-transform">
                <Camera className="w-7 h-7 stroke-[2.2]" />
              </div>
              <div>
                <h2 className="text-2xl font-black font-['Space_Grotesk'] text-white group-hover:text-amber-300 transition-colors">
                  Scan Registered Car QR
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Car parked in front of you? Point your phone camera at the windshield sticker to buzz the owner's phone or make an instant call/WhatsApp.
                </p>
              </div>
            </div>

            {/* Feature Bullets */}
            <div className="grid grid-cols-2 gap-2 my-5 text-xs text-slate-300">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                <BellRing className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Urgent Siren Buzz</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Direct Call / WhatsApp</span>
              </div>
            </div>
          </div>

          <div>
            {/* Primary Action Button */}
            <button
              onClick={() => openModal('scanAnyCar')}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer mb-3"
            >
              <Camera className="w-5 h-5 text-slate-950" />
              <span>SCAN REGISTERED CAR QR</span>
              <ArrowRight className="w-4 h-4 text-slate-950 ml-1" />
            </button>

            {/* Quick 1-Tap Parked Cars Presets */}
            <div className="pt-2 border-t border-slate-800/80">
              <div className="text-[11px] text-slate-400 mb-1.5 flex items-center justify-between">
                <span>Quick demo: simulate scanning parked car:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {vehicles.slice(0, 3).map((v) => (
                  <button
                    key={v.id}
                    onClick={() => openScannerForVehicle(v)}
                    className="text-[11px] px-2.5 py-1 rounded-xl bg-slate-900/80 hover:bg-amber-400/20 text-slate-300 hover:text-amber-300 border border-slate-800 hover:border-amber-400/40 transition-all font-mono"
                    title={`Simulate scanning ${v.plateNumber} (${v.makeModel})`}
                  >
                    🚗 {v.plateNumber} ({v.makeModel.split(' ')[0]})
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* CARD 2: REGISTER MY VEHICLE (For Car Owners) */}
        <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#14120c] to-[#0c0d14] border-2 border-yellow-500/40 hover:border-yellow-400 shadow-2xl shadow-yellow-500/10 transition-all group flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 text-[11px] font-bold">
                <Car className="w-3.5 h-3.5 text-yellow-400" />
                <span>FOR CAR OWNERS</span>
              </span>
              <span className="text-xs text-yellow-400/80 font-mono font-semibold">Privacy Shield Masking</span>
            </div>

            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-yellow-500/30 shrink-0 group-hover:scale-105 transition-transform">
                <QrCode className="w-7 h-7 stroke-[2.2]" />
              </div>
              <div>
                <h2 className="text-2xl font-black font-['Space_Grotesk'] text-white group-hover:text-yellow-300 transition-colors">
                  Register My Vehicle
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Get your smart PingPark decal for your windshield glass. Protect your personal mobile number and avoid towing or parking disputes.
                </p>
              </div>
            </div>

            {/* Feature Bullets */}
            <div className="grid grid-cols-2 gap-2 my-5 text-xs text-slate-300">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>Hide Phone Number</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                <Clock className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>1-Tap "On My Way"</span>
              </div>
            </div>
          </div>

          <div>
            {/* Primary Action Button */}
            <button
              onClick={() => openModal('registerVehicle')}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-slate-950 font-black text-sm shadow-xl shadow-yellow-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer mb-3"
            >
              <QrCode className="w-5 h-5 text-slate-950" />
              <span>REGISTER MY VEHICLE & GET DECAL</span>
              <ArrowRight className="w-4 h-4 text-slate-950 ml-1" />
            </button>

            {/* Secondary Action: Jump to studio */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Already registered?</span>
              <button
                onClick={() => onSelectTab && onSelectTab('decal')}
                className="text-amber-400 hover:text-amber-300 font-bold hover:underline flex items-center gap-1"
              >
                <span>View Windshield Decal Studio</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
