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
  Zap,
  Info,
  Tag
} from 'lucide-react';
import { useParkPing } from '../context/ParkPingContext';
import { HeroHologramGraphic } from './HeroHologramGraphic';

export const HeroBanner = ({ onSelectTab }) => {
  const { openModal, openScannerForVehicle, selectedVehicle, vehicles } = useParkPing();

  return (
    <section className="pt-2 pb-6 px-4 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Banner Tags (Matching Reference Image) */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <div className="glass-chip inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-amber-300/90 text-xs font-semibold border-amber-500/20">
          <Tag className="w-3.5 h-3.5 text-amber-400" />
          <span>The Smart Windshield QR Platform • Never Get Trapped Behind A Double-Parked Car</span>
        </div>

        <div className="glass-chip inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs text-slate-300 border-slate-700/60">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span>Zero App Download</span>
          <span className="text-slate-600">•</span>
          <span>100% Phone Privacy Shield</span>
        </div>
      </div>

      {/* Main Hero Header & 3D Holographic Graphic Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
        
        {/* Left 7 Columns: Bold Typography & Core Value */}
        <div className="lg:col-span-7 space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] font-['Space_Grotesk'] text-white">
            SOMEONE PARKED <br />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(245,158,11,0.35)]">
              IN FRONT OF YOU?
            </span> <br />
            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-200 mt-1 block">
              Scan Their Windshield QR & Move Them Fast.
            </span>
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed pt-1">
            No scribbled phone numbers on paper. No awkward honking for hours. Stick your smart <strong>PingPark</strong> decal on your glass so blocked drivers can buzz or reach you in seconds.
          </p>
        </div>

        {/* Right 5 Columns: 3D Holographic Windshield & Phone Illustration */}
        <div className="lg:col-span-5 relative">
          <HeroHologramGraphic 
            onScanClick={() => openModal('scanAnyCar')}
            onAlertClick={() => onSelectTab && onSelectTab('alerts')}
            vehicle={selectedVehicle}
          />
        </div>

      </div>

      {/* THE TWO FROSTED GLASS ACTION CARDS (Pixel-Perfect to Reference Mockup) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch mb-6">
        
        {/* CARD 1: SCAN REGISTERED CAR QR (For Blocked Drivers) */}
        <div className="glass-card-pro rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between group">
          
          {/* Subtle Ambient Back-Glow (Cyan & Amber) */}
          <div className="absolute -top-16 -left-16 w-56 h-56 bg-sky-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-sky-500/20 transition-all duration-700"></div>
          <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Top Row: Tag & Sub-label */}
          <div>
            <div className="flex items-center justify-between gap-3 mb-5">
              <span className="glass-chip inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-amber-300 text-[11px] font-bold border-amber-400/30">
                <Info className="w-3.5 h-3.5 text-amber-400" />
                <span>FOR BLOCKED DRIVERS</span>
              </span>
              <span className="text-xs text-amber-400/90 font-mono font-bold tracking-wide">
                Zero-App Instant Scan
              </span>
            </div>

            {/* Title Row with Camera Squircle */}
            <div className="flex items-start gap-4 mb-5">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/35 shrink-0 group-hover:scale-105 transition-transform">
                <Camera className="w-7 h-7 stroke-[2.3]" />
              </div>
              <div>
                <h2 className="text-2xl font-black font-['Space_Grotesk'] text-white group-hover:text-amber-300 transition-colors">
                  Scan Registered Car QR
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Car parked in front of you? Point your camera at the windshield sticker to buzz the owner's phone or make an instant alert.
                </p>
              </div>
            </div>

            {/* Two Feature Chips (Urgent Siren Buzz & Direct Alert / WhatsApp) */}
            <div className="grid grid-cols-2 gap-2.5 my-5 text-xs text-slate-200">
              <div className="glass-chip flex items-center gap-2 p-2.5 rounded-xl">
                <BellRing className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold text-[11px]">Urgent Siren Buzz</span>
              </div>
              <div className="glass-chip flex items-center gap-2 p-2.5 rounded-xl">
                <MessageSquare className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold text-[11px]">Direct Alert / WhatsApp</span>
              </div>
            </div>
          </div>

          <div>
            {/* Primary Action Button: SCAN REGISTERED CAR QR */}
            <button
              onClick={() => openModal('scanAnyCar')}
              className="glow-btn-yellow w-full py-4 px-6 rounded-2xl text-slate-950 text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer mb-4"
            >
              <Camera className="w-4 h-4 text-slate-950 stroke-[2.4]" />
              <span>SCAN REGISTERED CAR QR</span>
              <ArrowRight className="w-4 h-4 text-slate-950 ml-1 stroke-[2.5]" />
            </button>

            {/* Quick Demo: Simulate scanning parked car */}
            <div className="pt-3 border-t border-white/5">
              <div className="text-[11px] text-slate-400 mb-2">
                Quick Demo: simulate scanning parked car:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {vehicles.slice(0, 3).map((v) => (
                  <button
                    key={v.id}
                    onClick={() => openScannerForVehicle(v)}
                    className="glass-chip text-[11px] px-2.5 py-1 rounded-xl text-slate-300 hover:text-amber-300 hover:border-amber-400/50 transition-all font-mono"
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
        <div className="glass-card-pro rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between group">
          
          {/* Subtle Ambient Back-Glow (Cyan & Amber + Sparkle) */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/20 transition-all duration-700"></div>
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Top Row: Tag & Sub-label */}
          <div>
            <div className="flex items-center justify-between gap-3 mb-5">
              <span className="glass-chip inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-amber-300 text-[11px] font-bold border-amber-400/30">
                <Car className="w-3.5 h-3.5 text-amber-400" />
                <span>FOR CAR OWNERS</span>
              </span>
              <span className="text-xs text-amber-400/90 font-mono font-bold tracking-wide">
                Privacy Shield Masking
              </span>
            </div>

            {/* Title Row with QR Squircle */}
            <div className="flex items-start gap-4 mb-5">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/35 shrink-0 group-hover:scale-105 transition-transform">
                <QrCode className="w-7 h-7 stroke-[2.3]" />
              </div>
              <div>
                <h2 className="text-2xl font-black font-['Space_Grotesk'] text-white group-hover:text-amber-300 transition-colors">
                  Register My Vehicle
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Get your smart PingPark decal for your windshield glass. Protect your personal mobile number and avoid towing or parking disputes.
                </p>
              </div>
            </div>

            {/* Two Feature Chips (Hide Phone Number & 1-Tap "On My Way") */}
            <div className="grid grid-cols-2 gap-2.5 my-5 text-xs text-slate-200">
              <div className="glass-chip flex items-center gap-2 p-2.5 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold text-[11px]">Hide Phone Number</span>
              </div>
              <div className="glass-chip flex items-center gap-2 p-2.5 rounded-xl">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold text-[11px]">1-Tap "On My Way"</span>
              </div>
            </div>
          </div>

          <div>
            {/* Primary Action Button: REGISTER MY VEHICLE & GET DECAL */}
            <button
              onClick={() => openModal('registerVehicle')}
              className="glow-btn-yellow w-full py-4 px-6 rounded-2xl text-slate-950 text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer mb-4"
            >
              <QrCode className="w-4 h-4 text-slate-950 stroke-[2.4]" />
              <span>REGISTER MY VEHICLE & GET DECAL</span>
              <ArrowRight className="w-4 h-4 text-slate-950 ml-1 stroke-[2.5]" />
            </button>

            {/* Secondary Action: Already registered? View Decal Studio */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
              <span>Already registered?</span>
              <button
                onClick={() => onSelectTab && onSelectTab('decal')}
                className="text-amber-400 hover:text-amber-300 font-bold hover:underline flex items-center gap-1 cursor-pointer transition-colors"
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
