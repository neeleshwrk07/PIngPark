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
  PhoneCall,
  Target,
  Rocket,
  HeartHandshake
} from 'lucide-react';
import { useParkPing } from '../context/ParkPingContext';

export const PitchDeckModal = () => {
  const { modals, closeModal, setSimulatorMode } = useParkPing();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      badge: 'Hackathon Pitch Deck • Slide 1 of 6',
      title: 'PingPark: Smart Windshield QR Contact',
      subtitle: 'Ending the Double-Parking Crisis in Urban Metros & Large Parking Facilities',
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-center py-4">
            <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-500 flex items-center justify-center shadow-2xl shadow-amber-500/30">
              <QrCode className="w-14 h-14 text-slate-950 stroke-[2.4]" />
              <div className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-slate-900 border border-amber-400 text-amber-400 shadow-md">
                <Car className="w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl font-black text-white font-['Space_Grotesk']">
              "Someone parked right in front of my car. How do I get them to move?"
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              <strong>PingPark</strong> is a privacy-first smart windshield QR decal platform. Stick the weatherproof decal on your windshield glass. If you double-park or your headlights are left on, anyone points their phone camera at the sticker to buzz, call, or message you in seconds.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      badge: 'The Daily Pain Point • Slide 2 of 6',
      title: 'The Double-Parking Nightmare',
      subtitle: 'Why Parking Lots, Basements & Malls Turn Into Deadlocks',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2 text-xs">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-1.5">
            <div className="text-amber-400 text-xl font-black font-['Space_Grotesk']">Hours Lost</div>
            <div className="text-white font-bold text-xs">Trapped Drivers</div>
            <p className="text-slate-400 text-[11px]">
              Drivers honk endlessly and wait for hours in hospital, mall, or office lots because another car blocked their exit bay.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-yellow-500/30 space-y-1.5">
            <div className="text-yellow-400 text-xl font-black font-['Space_Grotesk']">Privacy Risk</div>
            <div className="text-white font-bold text-xs">Paper Slips Don't Work</div>
            <p className="text-slate-400 text-[11px]">
              Leaving personal phone numbers written on slips of paper leads to harassment, spam calls, and identity exposure—especially for female drivers.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-1.5">
            <div className="text-amber-300 text-xl font-black font-['Space_Grotesk']">Road Rage</div>
            <div className="text-white font-bold text-xs">Damage & Conflict</div>
            <p className="text-slate-400 text-[11px]">
              Frustrated trapped drivers slash tires, scratch paint, or call tow trucks, escalating conflicts unnecessarily into physical altercations.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 3,
      badge: 'The Innovation • Slide 3 of 6',
      title: 'The PingPark Solution',
      subtitle: 'Instant Vehicle Contact with Zero App Download for Scanners',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-2 text-xs">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/30 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <QrCode className="w-4 h-4" />
              <span>Smart Windshield Decal</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              Car owners print and stick a stylish, weatherproof QR decal on the inside of their front windshield glass with customizable themes.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-yellow-500/30 space-y-1.5">
            <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs">
              <PhoneCall className="w-4 h-4" />
              <span>1-Tap Direct Call, SMS & WhatsApp</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              The blocked person points their camera at the sticker to immediately dial the owner or send a pre-formatted WhatsApp / SMS alert.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/30 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Privacy Shield Protection</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              Owners can choose to mask their phone number and receive instant high-priority in-app audio car horn buzz sirens instead.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-yellow-500/30 space-y-1.5">
            <div className="flex items-center gap-2 text-yellow-300 font-bold text-xs">
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
      subtitle: 'Engineered for Sub-Second Alert Delivery on Any Mobile Browser',
      content: (
        <div className="space-y-3 my-2 text-xs">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-amber-400/40">
              <div className="font-bold text-amber-400">Node / Express</div>
              <div className="text-[10px] text-slate-400">Alert Dispatcher</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-yellow-400/40">
              <div className="font-bold text-yellow-400">Persistent Store</div>
              <div className="text-[10px] text-slate-400">Vehicle Decal DB</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-amber-500/40">
              <div className="font-bold text-amber-300">React 18 + Vite</div>
              <div className="text-[10px] text-slate-400">Mobile Scanner UI</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-yellow-500/40">
              <div className="font-bold text-yellow-300">Web Audio API</div>
              <div className="text-[10px] text-slate-400">Horn Siren Chimes</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
            <div className="text-amber-400 font-bold">REAL-TIME PIPELINE:</div>
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
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs my-2">
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-amber-500/30">
            <div className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-400 font-bold flex items-center justify-center mb-1.5">1</div>
            <div className="font-bold text-white">Car is Blocked</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Driver finds another car parked in front of their exit stall.</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-yellow-500/30">
            <div className="w-6 h-6 rounded-lg bg-yellow-400/20 text-yellow-400 font-bold flex items-center justify-center mb-1.5">2</div>
            <div className="font-bold text-white">Scan Windshield QR</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Points native phone camera at windshield decal. Zero app download.</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-amber-500/30">
            <div className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-300 font-bold flex items-center justify-center mb-1.5">3</div>
            <div className="font-bold text-white">Buzzer or Call</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Taps "Move Car", WhatsApp or Call. Owner device rings audio siren.</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-yellow-500/30">
            <div className="w-6 h-6 rounded-lg bg-yellow-400/20 text-yellow-300 font-bold flex items-center justify-center mb-1.5">4</div>
            <div className="font-bold text-white">Exit Cleared</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Owner replies "Coming now", arrives, moves car. Zero road rage.</div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      badge: 'Market & Scaling • Slide 6 of 6',
      title: 'Business Model, Scaling & Future Scope',
      subtitle: 'Monetization Channels, Gated Communities & Smart City Integration',
      content: (
        <div className="space-y-4 my-2 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-amber-500/30">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
                <Target className="w-4 h-4" />
                <span>D2C Smart Stickers</span>
              </div>
              <p className="text-slate-400 text-[11px]">Free digital QR generator with premium weather-proof metallic & holographic windshield stickers shipped for ₹199 / $3.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-yellow-500/30">
              <div className="flex items-center gap-1.5 text-yellow-400 font-bold mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>B2B Gated Societies</span>
              </div>
              <p className="text-slate-400 text-[11px]">Mandatory resident parking decals for large apartment societies to eliminate basement double-parking conflicts and security friction.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-amber-500/30">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold mb-1">
                <Rocket className="w-4 h-4" />
                <span>Smart City & Valet</span>
              </div>
              <p className="text-slate-400 text-[11px]">Custom branded decals for tech parks, hospitals, commercial valet operators with integration into parking management gates.</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-amber-400" />
              <span className="text-[11px] text-amber-200">
                <strong>Future Roadmap:</strong> IoT solar windshield beacon, FASTag RFID sync & AI CCTV double-park auto-detection.
              </span>
            </div>
            <button
              onClick={() => {
                closeModal('pitchDeck');
                setSimulatorMode(true);
              }}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs shadow-md transition-all shrink-0"
            >
              Live Demo
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
      <div className="glass-panel-glow max-w-2xl w-full p-6 sm:p-8 rounded-3xl relative text-white border-amber-500/40 shadow-2xl flex flex-col justify-between min-h-[480px]">
        
        <button
          onClick={() => closeModal('pitchDeck')}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Slide Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-[11px] font-mono text-amber-300 border border-amber-500/30 mb-2">
            <Presentation className="w-3.5 h-3.5 text-amber-400" />
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
                  currentSlide === idx ? 'w-7 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
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
              className="p-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 disabled:opacity-30 text-slate-950 font-bold shadow-md shadow-amber-500/20"
            >
              <ChevronRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
