import React, { useState } from 'react';
import { QrCode, Bell, Smartphone, Volume2, Sparkles, Radio, ShieldCheck, Car } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export const HeroHologramGraphic = ({ onScanClick, onAlertClick, vehicle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const plate = vehicle ? vehicle.plateNumber : 'HR75B7892';
  const model = vehicle ? vehicle.makeModel : 'White Breeza';

  const handlePhoneClick = () => {
    try {
      sound.playHornSiren();
    } catch (e) {}
    if (onAlertClick) onAlertClick();
  };

  return (
    <div 
      className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Neon Aura Back-Glows (Cyan + Amber) */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-72 h-72 bg-amber-500/15 rounded-full blur-[90px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-4 w-72 h-72 bg-sky-500/15 rounded-full blur-[100px] pointer-events-none"></div>
      
      {/* Ambient Stylized Car Windshield Outline in Perspective */}
      <div className="relative w-full max-w-[480px] h-full flex items-center justify-center">

        {/* 3D Angled Windshield Glass Panel */}
        <div 
          onClick={onScanClick}
          className="absolute left-2 sm:left-6 w-[230px] sm:w-[280px] h-[170px] sm:h-[200px] rounded-3xl bg-gradient-to-br from-sky-400/10 via-amber-400/5 to-slate-900/60 backdrop-blur-xl border border-sky-400/30 shadow-[0_15px_40px_rgba(14,165,233,0.15)] cursor-pointer group transition-all duration-500"
          style={{
            transform: isHovered 
              ? 'perspective(900px) rotateY(18deg) rotateX(12deg) scale(1.02)' 
              : 'perspective(900px) rotateY(24deg) rotateX(14deg)',
            transformOrigin: 'left center'
          }}
          title="Click to simulate scanning this windshield QR decal"
        >
          {/* Glass glare line */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent rounded-t-3xl pointer-events-none"></div>
          
          {/* Top corner decal badge */}
          <div className="absolute top-3 left-4 flex items-center gap-1.5 text-[9px] font-mono text-sky-300 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping"></span>
            <span>CAR WINDSHIELD GLASS</span>
          </div>

          {/* Centered Glowing PingPark QR Decal on the Glass */}
          <div className="absolute inset-0 m-auto w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-b from-amber-400 to-yellow-500 p-2 text-slate-950 flex flex-col items-center justify-between shadow-[0_0_35px_rgba(245,158,11,0.6)] group-hover:scale-105 transition-transform">
            <div className="w-full flex items-center justify-between text-[8px] font-black tracking-wider">
              <span>PINGPARK</span>
              <span className="font-mono">{plate}</span>
            </div>
            
            {/* The QR Matrix Pattern */}
            <div className="relative p-1 bg-slate-950 rounded-xl text-amber-400">
              <QrCode className="w-11 h-11 sm:w-12 sm:h-12" />
              {/* Laser scan line sweep */}
              <div className="absolute inset-x-0 h-0.5 bg-amber-300 shadow-[0_0_8px_#fde047] animate-bounce"></div>
            </div>

            <div className="text-[7px] font-bold text-slate-950 tracking-wider">
              SCAN TO CALL OWNER
            </div>
          </div>

          {/* Pulsing Sonar Waves Radiating from the QR to the Phone */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-28 h-28 pointer-events-none">
            <span className="sound-ripple-1 absolute inset-0 rounded-full border border-amber-400/60"></span>
            <span className="sound-ripple-2 absolute inset-0 rounded-full border border-yellow-400/40"></span>
            <span className="sound-ripple-3 absolute inset-0 rounded-full border border-sky-400/30"></span>
          </div>
        </div>

        {/* Floating Modern Smartphone Receiving the Ping Alert */}
        <div 
          onClick={handlePhoneClick}
          className="absolute right-2 sm:right-6 w-[170px] sm:w-[190px] h-[260px] sm:h-[300px] rounded-[36px] bg-[#0c0d16] border-[3px] border-amber-400/60 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(245,158,11,0.25)] p-2.5 flex flex-col justify-between cursor-pointer group transition-all duration-500 z-10"
          style={{
            transform: isHovered 
              ? 'translateY(-6px) rotate(2deg) scale(1.03)' 
              : 'translateY(0px) rotate(5deg)',
          }}
          title="Click to simulate owner phone buzzing"
        >
          {/* Phone Dynamic Island / Speaker */}
          <div className="w-16 h-3 bg-slate-900 rounded-full mx-auto mb-2 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
          </div>

          {/* Incoming Alert Display */}
          <div className="flex-1 rounded-2xl bg-gradient-to-b from-slate-900/90 to-amber-950/40 border border-amber-400/30 p-3 flex flex-col items-center justify-between text-center relative overflow-hidden">
            
            {/* Top notification header */}
            <div className="flex items-center gap-1 text-[9px] font-bold text-amber-300">
              <Radio className="w-3 h-3 text-amber-400 animate-pulse" />
              <span>INCOMING PING</span>
            </div>

            {/* Glowing Bell Alert Icon */}
            <div className="relative my-auto flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.6)] animate-pulse">
                <Bell className="w-7 h-7 stroke-[2.4]" />
              </div>

              <div className="text-xs font-black font-['Space_Grotesk'] text-white mt-2">
                PINGING OWNER
              </div>

              {/* Real-time Audio Waveform Visualizer */}
              <div className="flex items-center gap-1 mt-1.5 h-4">
                <span className="w-1 bg-amber-400 rounded-full animate-bounce h-3"></span>
                <span className="w-1 bg-yellow-300 rounded-full animate-bounce h-4" style={{ animationDelay: '0.15s' }}></span>
                <span className="w-1 bg-amber-400 rounded-full animate-bounce h-2" style={{ animationDelay: '0.3s' }}></span>
                <span className="w-1 bg-yellow-300 rounded-full animate-bounce h-4" style={{ animationDelay: '0.45s' }}></span>
                <span className="w-1 bg-amber-400 rounded-full animate-bounce h-3" style={{ animationDelay: '0.2s' }}></span>
              </div>
            </div>

            {/* Vehicle Details & Quick Response */}
            <div className="w-full space-y-1">
              <div className="text-[10px] text-slate-300 font-mono font-bold truncate">
                {plate}
              </div>
              <div className="w-full py-1.5 rounded-xl bg-amber-400 text-slate-950 font-black text-[9px] shadow-md group-hover:bg-yellow-300 transition-colors">
                1-TAP "ON MY WAY"
              </div>
            </div>

          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="w-14 h-1 bg-slate-700 rounded-full mx-auto mt-2"></div>
        </div>

      </div>
    </div>
  );
};
