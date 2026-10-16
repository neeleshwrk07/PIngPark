import React from 'react';
import { 
  QrCode, 
  Car, 
  Bell, 
  Volume2, 
  VolumeX, 
  PlusCircle, 
  Presentation, 
  Columns, 
  ShieldCheck, 
  Smartphone,
  AlertTriangle,
  Camera,
  Sparkles,
  Layers,
  HelpCircle
} from 'lucide-react';
import { useParkPing } from '../context/ParkPingContext';

export const Navbar = ({ onReplayIntro, onSelectTab, activeTab }) => {
  const { 
    vehicles, 
    selectedVehicle,
    selectedVehicleId, 
    setSelectedVehicleId, 
    activePings, 
    simulatorMode, 
    setSimulatorMode, 
    soundEnabled, 
    toggleSound, 
    openModal,
    openScannerForVehicle
  } = useParkPing();

  const unresolvedPings = activePings.filter(p => p.status === 'delivered');

  return (
    <header className="sticky top-4 z-40 w-full px-4 lg:px-8 mb-4 pointer-events-none">
      <div className="max-w-7xl mx-auto glass-pill-nav rounded-full px-5 py-2.5 flex items-center justify-between gap-4 pointer-events-auto transition-all">
        
        {/* Brand Logo: PingPark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 shadow-md shadow-amber-500/30 text-slate-950 font-black">
            <QrCode className="w-5 h-5 text-slate-950 stroke-[2.4]" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-lg font-black tracking-tight text-white font-['Space_Grotesk']">
              PING<span className="text-amber-400">PARK</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 font-mono font-bold border border-amber-400/30">
              WINDSHIELD QR
            </span>
          </div>
        </div>

        {/* Center Nav Links (Simulator, How it Works, Pitch Deck) */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-3 text-xs font-semibold text-slate-300">
          <button
            onClick={() => {
              if (onSelectTab) onSelectTab('simulator');
              else setSimulatorMode(true);
            }}
            className={`px-3 py-1.5 rounded-full transition-all hover:text-amber-300 ${
              activeTab === 'simulator' ? 'text-amber-400 bg-amber-400/10' : 'hover:bg-slate-800/60'
            }`}
          >
            Simulator
          </button>

          <button
            onClick={() => onSelectTab && onSelectTab('steps')}
            className={`px-3 py-1.5 rounded-full transition-all hover:text-amber-300 ${
              activeTab === 'steps' ? 'text-amber-400 bg-amber-400/10' : 'hover:bg-slate-800/60'
            }`}
          >
            How it Works
          </button>

          <button
            onClick={() => openModal('pitchDeck')}
            className="px-3 py-1.5 rounded-full transition-all hover:text-amber-300 hover:bg-slate-800/60 flex items-center gap-1 text-slate-300"
          >
            <Presentation className="w-3.5 h-3.5 text-amber-400" />
            <span>Pitch Deck</span>
          </button>

          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              className="px-3 py-1.5 rounded-full transition-all hover:text-amber-300 hover:bg-slate-800/60 flex items-center gap-1 text-slate-400"
              title="Replay Cinematic Starter Animation"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Intro</span>
            </button>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          
          {/* Register Car Button (Golden Pill) */}
          <button
            onClick={() => openModal('registerVehicle')}
            className="glow-btn-yellow px-4 py-2 rounded-full text-xs font-black transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
            <span>Register Car</span>
          </button>

          {/* Active Alert Pill */}
          <button
            onClick={() => onSelectTab && onSelectTab('alerts')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold border transition-all ${
              unresolvedPings.length > 0
                ? 'bg-amber-400/20 border-amber-400/50 text-amber-300 shadow-md shadow-amber-500/20 animate-pulse'
                : 'bg-slate-900/60 border-slate-700/80 text-slate-300 hover:border-amber-400/40'
            }`}
            title="View Real-Time Move Alerts"
          >
            <Bell className={`w-3.5 h-3.5 ${unresolvedPings.length > 0 ? 'text-amber-400 animate-bounce' : 'text-slate-400'}`} />
            <span className="text-[11px] font-bold">
              {unresolvedPings.length > 0 ? `${unresolvedPings.length} Active Alert` : '0 Active Alert'}
            </span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-full bg-slate-800/70 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-all"
            title={soundEnabled ? 'Mute Alert Sounds' : 'Enable Alert Sounds'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
          </button>

        </div>

      </div>
    </header>
  );
};
