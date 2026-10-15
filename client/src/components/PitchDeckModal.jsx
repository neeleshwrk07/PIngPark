import React, { useState, useEffect } from 'react';
import { 
  Presentation, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  TrendingUp, 
  QrCode, 
  Car, 
  ShieldCheck, 
  Play, 
  Clock, 
  PhoneCall 
} from 'lucide-react';
import { useParkPing } from '../context/ParkPingContext';

export const PitchDeckModal = () => {
  const { modals, closeModal, setSimulatorMode } = useParkPing();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      badge: 'Hackathon Pitch Deck • Slide 1 of 6',
      title: 'ParkPing: Smart Windshield QR Contact',
      subtitle: 'Ending the Double-Parking Nightmare in Urban India & Global Metros',
      theme: 'from-emerald-500/20 via-cyan-500/10 to-transparent',
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-center py-4">
            <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-emerald-500/30">
              <QrCode className="w-14 h-14 text-slate-950" />
              <div className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-slate-900 border border-emerald-400 text-emerald-400">
                <Car className="w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl font-black text-white font-['Space_Grotesk']">
              "Someone parked right in front of my car. How do I get them to move?"
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              ParkPing is a privacy-first smart windshield QR decal. Stick it on your car glass. If you block someone or your lights are left on, anyone scans your QR with their phone camera to call, WhatsApp, or instant-buzz you in seconds.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      badge: 'The Daily Pain Point • Slide 2 of 6',
      title: 'The Double-Parking Crisis',
      subtitle: 'Why Parking Lots & Apartment Basements Turn Into Deadlocks',
      theme: 'from-rose-500/20 via-amber-500/10 to-transparent',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2 text-xs">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-rose-900/60 space-y-1.5">
            <div className="text-rose-400 text-xl font-black font-['Space_Grotesk']">Hours Wasted</div>
            <div className="text-white font-bold text-xs">Trapped Drivers</div>
            <p className="text-slate-400 text-[11px]">
              Drivers honk endlessly and wait for hours in hospital, mall, or office lots because another car blocked their exit.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-900/60 space-y-1.5">
            <div className="text-amber-400 text-xl font-black font-['Space_Grotesk']">Privacy Risk</div>
            <div className="text-white font-bold text-xs">Paper Notes Don't Work</div>
            <p className="text-slate-400 text-[11px]">
              Leaving personal phone numbers written on slips of paper leads to harassment, spam calls, and identity exposure—especially for female drivers.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-900/60 space-y-1.5">
            <div className="text-purple-400 text-xl font-black font-['Space_Grotesk']">Road Rage</div>
            <div className="text-white font-bold text-xs">Property Damage</div>
            <p className="text-slate-400 text-[11px]">
              Frustrated trapped drivers slash tires, scratch paint, or call tow trucks, escalating conflicts unnecessarily.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 3,
      badge: 'The Innovation • Slide 3 of 6',
      title: 'The ParkPing Solution',
      subtitle: 'Instant Vehicle Contact with Zero App Download for Scanners',
      theme: 'from-emerald-500/20 via-cyan-500/10 to-transparent',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-2 text-xs">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <QrCode className="w-4 h-4" />
              <span>Smart Windshield Decal</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              Car owners print and stick a stylish, weatherproof QR decal on the inside of their front windshield glass.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
              <PhoneCall className="w-4 h-4" />
              <span>1-Tap Direct Call & WhatsApp</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              The blocked person points their camera at the sticker to immediately dial the owner or send a pre-formatted WhatsApp alert.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Privacy Shield Protection</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              Owners can choose to mask their phone number and receive instant high-priority in-app audio buzz sirens instead.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
              <Clock className="w-4 h-4" />
              <span>"On My Way (2 mins)" Quick Replies</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              Owner taps 1 quick-reply button, which instantly updates the blocked driver's phone in real time, preventing anxiety and honking.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 4,
      badge: 'Technical Architecture • Slide 4 of 6',
      title: 'Full MERN Stack + Real-Time SSE',
      subtitle: 'Engineered for Sub-Second Alert Delivery',
      theme: 'from-blue-500/20 via-purple-500/10 to-transparent',
      content: (
        <div className="space-y-3 my-2 text-xs">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-emerald-500/30">
              <div className="font-bold text-emerald-400">Node / Express</div>
              <div className="text-[10px] text-slate-400">Alert Dispatcher</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-cyan-500/30">
              <div className="font-bold text-cyan-400">Persistent Store</div>
              <div className="text-[10px] text-slate-400">Vehicle Decal DB</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-purple-500/30">
              <div className="font-bold text-purple-400">React 18 + Vite</div>
              <div className="text-[10px] text-slate-400">Responsive Scanner UI</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-amber-500/30">
              <div className="font-bold text-amber-400">Web Audio API</div>
              <div className="text-[10px] text-slate-400">Car Horn Siren Chimes</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
            <div className="text-emerald-400 font-bold">REAL-TIME PIPELINE:</div>
            <div>[Camera Scan] ➔ [GET /api/vehicles/:qrCode] ➔ [POST /api/ping/:qrCode]</div>
            <div>➔ [Server-Sent Events (SSE)] ➔ [Owner Device Sounds Horn Siren in &lt;100ms]</div>
            <div>➔ [Owner Taps "On My Way in 2 mins"] ➔ [Scanner Phone Confirms Celebration]</div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      badge: 'The User Journey • Slide 5 of 6',
      title: 'How It Works in Practice',
      subtitle: 'From Stuck Driver to Clear Exit in Under 3 Minutes',
      theme: 'from-cyan-500/20 via-emerald-500/10 to-transparent',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs my-2">
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center mb-1.5">1</div>
            <div className="font-bold text-white">Car is Blocked</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Driver finds a car double-parked in front of their exit.</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center mb-1.5">2</div>
            <div className="font-bold text-white">Scan Windshield QR</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Points phone camera at windshield decal. No app needed.</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center mb-1.5">3</div>
            <div className="font-bold text-white">Buzzer or Call</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Taps "Move Car" or direct calls. Owner device rings.</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center mb-1.5">4</div>
            <div className="font-bold text-white">Resolution in 2 Mins</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Owner replies "Coming now", arrives, moves car. Zero road rage.</div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      badge: 'Market & Monetization • Slide 6 of 6',
      title: 'Business Model & Scaling',
      subtitle: 'Gated Communities, Commercial Towers, and Fleet Stickers',
      theme: 'from-emerald-500/20 via-pink-500/10 to-transparent',
      content: (
        <div className="space-y-4 my-2 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="font-bold text-white mb-1">Direct-to-Consumer</div>
              <p className="text-slate-400 text-[11px]">Free digital QR generator with premium weather-proof metallic & holographic windshield stickers shipped for ₹199.</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="font-bold text-cyan-400 mb-1">B2B Housing Societies</div>
              <p className="text-slate-400 text-[11px]">Integrated resident parking decals for large apartment societies to eliminate basement double-parking conflicts.</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="font-bold text-purple-400 mb-1">Corporate & Valet Lots</div>
              <p className="text-slate-400 text-[11px]">Custom branded decals for tech parks, hospitals, and commercial valet operators with internal operator consoles.</p>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => {
                closeModal('pitchDeck');
                setSimulatorMode(true);
              }}
              className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-xl shadow-emerald-500/25 transition-all inline-flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <Play className="w-4 h-4 text-slate-950" />
              <span>Launch Live Split-Screen Demo</span>
            </button>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    if (!modals.pitchDeck) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(0, prev - 1));
      } else if (e.key === 'Escape') {
        closeModal('pitchDeck');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modals.pitchDeck, closeModal, slides.length]);

  if (!modals.pitchDeck) return null;

  const slide = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fadeIn">
      <div className="glass-panel-glow max-w-2xl w-full p-6 sm:p-8 rounded-3xl relative text-white border-slate-700 shadow-2xl flex flex-col justify-between min-h-[480px]">
        
        <button
          onClick={() => closeModal('pitchDeck')}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Slide Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-[11px] font-mono text-purple-300 border border-slate-700 mb-2">
            <Presentation className="w-3.5 h-3.5 text-purple-400" />
            <span>{slide.badge}</span>
          </div>
          <h2 className="text-2xl font-black font-['Space_Grotesk'] text-white">
            {slide.title}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {slide.subtitle}
          </p>
        </div>

        {/* Dynamic Slide Content */}
        <div className="my-auto py-3 animate-fadeIn" key={currentSlide}>
          {slide.content}
        </div>

        {/* Slide Footer */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === idx ? 'w-7 bg-emerald-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
              disabled={currentSlide === 0}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-400 px-1">
              {currentSlide + 1} / {slides.length}
            </span>
            <button
              onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
              disabled={currentSlide === slides.length - 1}
              className="p-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
            >
              <ChevronRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
