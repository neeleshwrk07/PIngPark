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
  AlertTriangle
} from 'lucide-react';
import { useParkPing } from '../context/ParkPingContext';

export const Navbar = () => {
  const { 
    vehicles, 
    selectedVehicleId, 
    setSelectedVehicleId, 
    activePings, 
    simulatorMode, 
    setSimulatorMode, 
    soundEnabled, 
    toggleSound, 
    openModal 
  } = useParkPing();

  const unresolvedPings = activePings.filter(p => p.status !== 'resolved');

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-lg shadow-emerald-500/20 text-slate-950 font-black">
            <QrCode className="w-6 h-6 text-slate-950" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white font-['Space_Grotesk']">
                PARK<span className="text-emerald-400">PING</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                WINDSHIELD QR
              </span>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span>Smart Car-Contact & Move Alert</span>
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
          <div className="hidden md:flex items-center gap-2 glass-card px-3.5 py-1.5 rounded-2xl text-xs text-slate-300">
            <Car className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-500 font-medium">My Vehicle:</span>
            <select
              value={selectedVehicleId || ''}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
              className="bg-transparent text-emerald-300 font-bold focus:outline-none cursor-pointer"
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
          
          {/* Split Screen Simulator Toggle (For testing & Judges demo!) */}
          <button
            onClick={() => setSimulatorMode(!simulatorMode)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-lg ${
              simulatorMode
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 border-emerald-400 shadow-emerald-500/25 scale-105'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border-slate-700 hover:border-cyan-500/50'
            }`}
            title="Toggle Split-Screen Simulator (Scanner Phone vs Owner Dashboard)"
          >
            <Columns className="w-4 h-4" />
            <span className="hidden sm:inline">Split-Screen Simulator</span>
          </button>

          {/* Pitch Deck (Hackathon Presentation) */}
          <button
            onClick={() => openModal('pitchDeck')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-semibold shadow-lg shadow-purple-500/10 transition-all hover:scale-105 active:scale-95"
            title="Open Hackathon Pitch Presentation Deck"
          >
            <Presentation className="w-4 h-4 text-purple-400 animate-bounce" />
            <span className="hidden md:inline">Pitch Deck</span>
          </button>

          {/* Add Vehicle */}
          <button
            onClick={() => openModal('registerVehicle')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all shadow-md shadow-emerald-500/20 active:scale-95"
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
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

        </div>

      </div>
    </header>
  );
};
