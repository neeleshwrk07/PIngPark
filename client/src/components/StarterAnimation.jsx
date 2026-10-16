import React, { useState, useEffect } from 'react';
import { QrCode, Car, Sparkles, ArrowRight, ShieldCheck, BellRing } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export const StarterAnimation = ({ onComplete }) => {
  const [stage, setStage] = useState(0); // 0: init, 1: laser/radar, 2: logo reveal, 3: ready
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Sound on starter
    try {
      sound.playSuccess();
    } catch (e) {}

    const timer1 = setTimeout(() => setStage(1), 300);
    const timer2 = setTimeout(() => setStage(2), 1100);
    const timer3 = setTimeout(() => setStage(3), 2000);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 2.5;
      });
    }, 70);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  const handleEnter = () => {
    sound.playClick();
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#06070a] text-white overflow-hidden select-none animate-fadeIn">
      
      {/* Background Animated Amber Nebula Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Grid line overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* Central Content */}
      <div className="relative z-10 max-w-lg w-full px-6 flex flex-col items-center text-center">
        
        {/* Radar & Scanner Optical Graphic */}
        <div className="relative w-40 h-40 flex items-center justify-center mb-6">
          
          {/* Outer Pulsing Rings */}
          <div className={`absolute inset-0 rounded-full border border-amber-500/30 transition-all duration-1000 ${stage >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          </div>
          
          <div className={`absolute inset-3 rounded-full border border-dashed border-amber-400/40 transition-all duration-1000 animate-spin ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`} style={{ animationDuration: '14s' }}></div>
          
          <div className={`absolute inset-7 rounded-full bg-amber-500/10 border border-amber-400/50 backdrop-blur-sm transition-all duration-700 ${stage >= 1 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}></div>

          {/* Golden Laser Scanner Sweep */}
          {stage >= 1 && (
            <div className="absolute inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent shadow-[0_0_12px_#f59e0b] animate-bounce" style={{ animationDuration: '1.6s' }}></div>
          )}

          {/* Central Logo Box */}
          <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 flex items-center justify-center shadow-2xl shadow-amber-500/40 transition-all duration-700 ${stage >= 2 ? 'scale-100 rotate-0' : 'scale-50 rotate-12'}`}>
            <QrCode className="w-10 h-10 text-slate-950 stroke-[2.4]" />
            <span className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-slate-900 border border-amber-400/80 text-amber-400 shadow-lg">
              <Car className="w-4 h-4" />
            </span>
          </div>

        </div>

        {/* Title Reveal */}
        <div className={`space-y-2 transition-all duration-700 ${stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>SMART WINDSHIELD QR ECOSYSTEM</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black font-['Space_Grotesk'] tracking-tight text-white">
            PING<span className="text-amber-400">PARK</span>
          </h1>

          <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
            Trapped in a parking lot? Point your camera at the windshield decal to buzz or call the owner instantly.
          </p>
        </div>

        {/* 3 Quick Pillars */}
        <div className={`grid grid-cols-3 gap-2 w-full mt-6 mb-6 transition-all duration-700 ${stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-amber-500/20 text-center">
            <QrCode className="w-4 h-4 text-amber-400 mx-auto mb-1" />
            <div className="text-[11px] font-bold text-white">Zero App</div>
            <div className="text-[9px] text-slate-400">Camera Scan</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-amber-500/20 text-center">
            <BellRing className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
            <div className="text-[11px] font-bold text-white">Instant Siren</div>
            <div className="text-[9px] text-slate-400">Real-time Buzz</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-amber-500/20 text-center">
            <ShieldCheck className="w-4 h-4 text-amber-300 mx-auto mb-1" />
            <div className="text-[11px] font-bold text-white">Privacy First</div>
            <div className="text-[9px] text-slate-400">Phone Masking</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-900 rounded-full h-1.5 mb-5 overflow-hidden border border-slate-800">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleEnter}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>ENTER PINGPARK</span>
          <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={handleEnter}
          className="mt-3 text-xs text-slate-500 hover:text-amber-400 transition-colors font-mono"
        >
          Skip animation →
        </button>

      </div>

    </div>
  );
};
