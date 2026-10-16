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
  Sparkles
} from 'lucide-react';
import { useParkPing } from '../context/ParkPingContext';

export const Navbar = ({ onReplayIntro }) => {
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
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-amber-500/20 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo: PingPark */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 shadow-lg shadow-amber-500/25 text-slate-950 font-black">
            <QrCode className="w-6 h-6 text-slate-950 stroke-[2.4]" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white font-['Space_Grotesk']">
                PING<span className="text-amber-400">PARK</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
                WINDSHIELD QR
              </span>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span>Smart Car Contact & Move Alert</span>
              {unresolvedPings.length > 0 && (
                <span className="text-rose-400 font-bold flex items-center gap-1 animate-pulse">
                  • 🚨 {unresolvedPings.length} Active Move Request!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Vehicle Selector (Owner's Garage) */}
        {vehicles.length > 0 && (
          <div className="hidden md:flex items-center gap-2 glass-card px-3.5 py-1.5 rounded-2xl text-xs text-slate-300 border-amber-500/20">
            <Car className="w-4 h-4 text-amber-400" />
            <span className="text-slate-500 font-medium">My Vehicle:</span>
            <select
              value={selectedVehicleId || ''}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
              className="bg-transparent text-amber-300 font-bold focus:outline-none cursor-pointer"
            >
              {vehicles.map(v => (
                <option key={v.id} value={v.id} className="bg-slate-900 text-slate-100">
                  {v.plateNumber} • {v.makeModel.split(' ')[0]}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          
          {/* Quick Scan Button */}
          {selectedVehicle && (
            <button
              onClick={() => openScannerForVehicle(selectedVehicle)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-amber-500/40 text-amber-300 text-xs font-semibold shadow-md transition-all hover:scale-105 active:scale-95"
              title="Simulate scanning this car's windshield QR"
            >
              <Camera className="w-4 h-4 text-amber-400" />
              <span>Simulate Scan</span>
            </button>
          )}

          {/* Split Screen Simulator Toggle (For testing & Judges demo!) */}
          <button
            onClick={() => setSimulatorMode(!simulatorMode)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-lg ${
              simulatorMode
                ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 border-amber-300 shadow-amber-500/30 scale-105'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border-slate-700 hover:border-amber-400/50'
            }`}
            title="Toggle Split-Screen Simulator (Scanner Phone vs Owner Dashboard)"
          >
            <Columns className="w-4 h-4" />
            <span className="hidden sm:inline">Split Simulator</span>
          </button>

          {/* Replay Cinematic Starter Intro */}
          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-400/50 text-slate-300 hover:text-amber-300 text-xs font-semibold shadow-md transition-all hover:scale-105 active:scale-95"
              title="Replay Cinematic Starter Animation"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Intro</span>
            </button>
          )}

          {/* Pitch Deck (Hackathon Presentation) */}
          <button
            onClick={() => openModal('pitchDeck')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 text-xs font-semibold shadow-lg shadow-amber-500/10 transition-all hover:scale-105 active:scale-95"
            title="Open Hackathon Pitch Presentation Deck"
          >
            <Presentation className="w-4 h-4 text-amber-400 animate-bounce" />
            <span className="hidden md:inline">Pitch Deck</span>
          </button>

          {/* Add Vehicle */}
          <button
            onClick={() => openModal('registerVehicle')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 text-xs font-black transition-all shadow-md shadow-amber-500/20 active:scale-95"
          >
            <PlusCircle className="w-4 h-4 text-slate-950" />
            <span className="hidden sm:inline">Register Car</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700 text-slate-300 transition-all"
            title={soundEnabled ? 'Mute Alert Sounds' : 'Enable Alert Sounds'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

        </div>

      </div>
    </header>
  );
};
