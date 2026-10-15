import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { 
  QrCode, 
  Printer, 
  Download, 
  Smartphone, 
  Car, 
  PhoneCall, 
  MessageSquare, 
  ShieldCheck, 
  AlertTriangle, 
  Edit3, 
  Palette,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useParkPing } from '../context/ParkPingContext';

export const WindshieldDecalCard = () => {
  const { selectedVehicle, updateVehicle, openScannerForVehicle } = useParkPing();
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [activeTheme, setActiveTheme] = useState('cyber');
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [statusNoteText, setStatusNoteText] = useState('');
  const decalRef = useRef(null);

  useEffect(() => {
    if (!selectedVehicle) return;
    setStatusNoteText(selectedVehicle.statusNote || '');
    setActiveTheme(selectedVehicle.decalStyle || 'cyber');

    // Generate dynamic QR image pointing to public vehicle page or token
    const qrTargetUrl = `${window.location.origin}/?scan=${selectedVehicle.qrCode}`;
    QRCode.toDataURL(qrTargetUrl, {
      width: 260,
      margin: 1,
      color: {
        dark: activeTheme === 'minimal' ? '#000000' : '#090e17',
        light: '#ffffff'
      }
    }).then(url => setQrDataUrl(url)).catch(() => {});
  }, [selectedVehicle, activeTheme]);

  if (!selectedVehicle) {
    return (
      <div className="glass-panel p-8 rounded-3xl max-w-md mx-auto text-center border-slate-800">
        <Car className="w-12 h-12 text-slate-600 mx-auto mb-3" />
        <h3 className="text-white font-bold text-base mb-1">No Vehicle Registered</h3>
        <p className="text-xs text-slate-400">Click "Register Car" in the navigation bar to create your first windshield QR decal.</p>
      </div>
    );
  }

  const handleStatusChange = (newStatus) => {
    updateVehicle(selectedVehicle.id, { parkingStatus: newStatus });
  };

  const handleSaveNote = () => {
    updateVehicle(selectedVehicle.id, { statusNote: statusNoteText });
    setIsEditingNote(false);
  };

  const handlePrint = () => {
    try {
      confetti({ particleCount: 60, spread: 60 });
    } catch (e) {}
    window.print();
  };

  // Visual decal themes
  const themes = {
    cyber: {
      border: 'border-emerald-500/50 shadow-emerald-500/20',
      headerBg: 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      accent: 'text-emerald-400'
    },
    neon: {
      border: 'border-cyan-500/50 shadow-cyan-500/20',
      headerBg: 'bg-gradient-to-r from-cyan-500 to-purple-500 text-slate-950',
      badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      accent: 'text-cyan-400'
    },
    hazard: {
      border: 'border-amber-500/50 shadow-amber-500/20',
      headerBg: 'bg-gradient-to-r from-amber-400 to-rose-500 text-slate-950',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      accent: 'text-amber-400'
    },
    minimal: {
      border: 'border-slate-500/40 shadow-slate-500/10',
      headerBg: 'bg-white text-slate-950 font-black',
      badge: 'bg-slate-800 text-slate-300 border-slate-700',
      accent: 'text-white'
    }
  };

  const currentStyle = themes[activeTheme] || themes.cyber;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left: The Physical Windshield Sticker Card */}
      <div className="lg:col-span-6 flex flex-col items-center">
        
        <div className="text-xs text-slate-400 mb-2 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Windshield Glass Sticker Preview (Ready to Print)</span>
        </div>

        {/* The Decal Box */}
        <div 
          ref={decalRef}
          className={`w-full max-w-sm rounded-[28px] overflow-hidden bg-slate-950 border-2 ${currentStyle.border} shadow-2xl transition-all duration-300 relative`}
        >
          {/* Top Decal Banner */}
          <div className={`${currentStyle.headerBg} p-4 text-center font-black tracking-wide`}>
            <div className="text-[11px] uppercase tracking-widest font-mono">PARKPING VERIFIED DECAL</div>
            <div className="text-sm sm:text-base font-black font-['Space_Grotesk'] mt-0.5">
              BLOCKED BY THIS CAR?
            </div>
            <div className="text-[10px] font-semibold opacity-90">
              SCAN QR TO CALL / MOVE OWNER
            </div>
          </div>

          {/* Central QR Code & Plate */}
          <div className="p-6 flex flex-col items-center bg-slate-900/90">
            <div className="p-3.5 rounded-2xl bg-white shadow-xl flex items-center justify-center mb-3">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="Windshield QR Decal" className="w-44 h-44 rounded-lg" />
              ) : (
                <div className="w-44 h-44 flex items-center justify-center text-slate-400 text-xs">
                  Generating Decal QR...
                </div>
              )}
            </div>

            {/* License Plate Graphic */}
            <div className="border-2 border-slate-700 bg-slate-950 px-4 py-1.5 rounded-xl font-mono text-lg font-black text-white tracking-widest flex items-center gap-2 shadow-inner">
              <span className="text-xs text-cyan-400 font-sans font-bold">IND</span>
              <span>{selectedVehicle.plateNumber}</span>
            </div>

            <div className="text-xs text-slate-300 font-semibold mt-1">
              {selectedVehicle.makeModel}
            </div>

            {/* Parking Status Badge */}
            <div className="mt-3">
              {selectedVehicle.parkingStatus === 'blocking' ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold animate-pulse">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Double-Parked (Available on Call)</span>
                </div>
              ) : selectedVehicle.parkingStatus === 'valet' ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Keys with Security Guard</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Parked in Safe Regular Bay</span>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Decal Footer */}
          <div className="bg-slate-950 p-3 text-center border-t border-slate-800/80 text-[10px] text-slate-500 font-mono">
            SECURE VEHICLE CONTACT • NO APP REQUIRED TO SCAN
          </div>
        </div>

        {/* Print / Action Buttons */}
        <div className="flex items-center gap-3 mt-4 w-full max-w-sm">
          <button
            onClick={handlePrint}
            className="flex-1 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <Printer className="w-4 h-4 text-slate-950" />
            <span>Print Decal Sticker</span>
          </button>

          <button
            onClick={() => openScannerForVehicle(selectedVehicle)}
            className="flex-1 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all hover:scale-105 active:scale-95"
          >
            <Smartphone className="w-4 h-4" />
            <span>Test Scanner View</span>
          </button>
        </div>

      </div>

      {/* Right: Owner Controls & Parking Status Settings */}
      <div className="lg:col-span-6 space-y-5">
        
        {/* Status Mode Box */}
        <div className="glass-panel p-6 rounded-3xl border-slate-800">
          <h3 className="text-lg font-black text-white font-['Space_Grotesk'] mb-2 flex items-center gap-2">
            <Car className="w-5 h-5 text-emerald-400" />
            <span>Current Parking Situation</span>
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Update your car's status right now so anyone scanning knows your availability:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5">
            {[
              { id: 'blocking', label: 'Double-Parked', desc: 'Blocked someone; ready to move', icon: AlertTriangle, color: 'border-amber-500/60 bg-amber-950/30 text-amber-300' },
              { id: 'safe', label: 'Safe Bay', desc: 'Parked legally in stall', icon: CheckCircle2, color: 'border-emerald-500/60 bg-emerald-950/30 text-emerald-300' },
              { id: 'valet', label: 'Key with Guard', desc: 'Guard can move car', icon: ShieldCheck, color: 'border-cyan-500/60 bg-cyan-950/30 text-cyan-300' },
            ].map(st => {
              const Icon = st.icon;
              const isSelected = selectedVehicle.parkingStatus === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => handleStatusChange(st.id)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    isSelected 
                      ? `${st.color} font-bold shadow-md scale-105` 
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 mb-1.5" />
                  <div className="text-xs font-bold">{st.label}</div>
                  <div className="text-[10px] opacity-75">{st.desc}</div>
                </button>
              );
            })}
          </div>

          {/* Quick Note Editor */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Live Note to Blocked Drivers:</span>
              </span>
              {!isEditingNote && (
                <button
                  onClick={() => setIsEditingNote(true)}
                  className="text-[11px] text-cyan-400 hover:underline font-semibold"
                >
                  Edit Note
                </button>
              )}
            </div>

            {isEditingNote ? (
              <div className="space-y-2">
                <textarea
                  value={statusNoteText}
                  onChange={(e) => setStatusNoteText(e.target.value)}
                  rows="2"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-emerald-500 outline-none"
                  placeholder="e.g. Parked for 10 mins near Tower 3. Call or ping me and I'll come down!"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsEditingNote(false)}
                    className="px-3 py-1 rounded-lg text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveNote}
                    className="px-4 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-300 italic">
                "{selectedVehicle.statusNote || 'No special note set.'}"
              </p>
            )}
          </div>
        </div>

        {/* Sticker Theme Customizer */}
        <div className="glass-panel p-6 rounded-3xl border-slate-800">
          <h3 className="text-sm font-black text-white font-['Space_Grotesk'] mb-3 flex items-center gap-2">
            <Palette className="w-4 h-4 text-cyan-400" />
            <span>Customize Decal Sticker Style</span>
          </h3>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'cyber', label: 'Cyber Emerald', dot: 'bg-emerald-400' },
              { id: 'neon', label: 'Neon Cyan & Purple', dot: 'bg-cyan-400' },
              { id: 'hazard', label: 'Amber Caution', dot: 'bg-amber-400' },
              { id: 'minimal', label: 'Monochrome Clean', dot: 'bg-white' },
            ].map(thm => (
              <button
                key={thm.id}
                onClick={() => {
                  setActiveTheme(thm.id);
                  updateVehicle(selectedVehicle.id, { decalStyle: thm.id });
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs border transition-all ${
                  activeTheme === thm.id
                    ? 'border-emerald-400 bg-emerald-500/20 text-white font-bold'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${thm.dot}`}></span>
                <span>{thm.label}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
