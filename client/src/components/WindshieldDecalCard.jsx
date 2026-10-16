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
  CheckCircle2,
  Trash2,
  Wifi,
  Laptop
} from 'lucide-react';
import { useParkPing } from '../context/ParkPingContext';

export const WindshieldDecalCard = () => {
  const { selectedVehicle, updateVehicle, deleteVehicle, openScannerForVehicle, networkInfo } = useParkPing();
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [activeTheme, setActiveTheme] = useState('gold');
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [statusNoteText, setStatusNoteText] = useState('');
  const [qrHostMode, setQrHostMode] = useState('wifi'); // 'wifi' | 'localhost'
  const decalRef = useRef(null);

  useEffect(() => {
    if (!selectedVehicle) return;
    setStatusNoteText(selectedVehicle.statusNote || '');
    setActiveTheme(selectedVehicle.decalStyle || 'gold');

    // Determine target host based on environment (Render cloud public URL vs local Wi-Fi vs localhost)
    let baseUrl = window.location.origin;
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (isLocal) {
      if (qrHostMode === 'wifi' && networkInfo && networkInfo.mobileBaseUrl) {
        baseUrl = networkInfo.mobileBaseUrl;
      }
    } else {
      // In cloud production (Render), always use the live public HTTPS domain
      baseUrl = window.location.origin;
    }

    const qrTargetUrl = `${baseUrl}/?scan=${selectedVehicle.qrCode}`;
    QRCode.toDataURL(qrTargetUrl, {
      width: 280,
      margin: 1,
      color: {
        dark: activeTheme === 'minimal' ? '#000000' : '#12131a',
        light: '#ffffff'
      }
    }).then(url => setQrDataUrl(url)).catch(() => {});
  }, [selectedVehicle, activeTheme, qrHostMode, networkInfo]);

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

  const handleDownloadPng = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `PingPark-Decal-${selectedVehicle.plateNumber}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    try {
      confetti({ particleCount: 40, spread: 50 });
    } catch (e) {}
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to remove ${selectedVehicle.plateNumber} from your garage?`)) {
      deleteVehicle(selectedVehicle.id);
    }
  };

  // Visual decal themes (Yellowish Palette)
  const themes = {
    gold: {
      border: 'border-amber-400/80 shadow-amber-500/25',
      headerBg: 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950',
      badge: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
      accent: 'text-amber-400'
    },
    hazard: {
      border: 'border-yellow-400 shadow-yellow-500/25',
      headerBg: 'bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 text-slate-950 font-black',
      badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
      accent: 'text-yellow-400'
    },
    honey: {
      border: 'border-amber-500/60 shadow-amber-500/20',
      headerBg: 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-bold',
      badge: 'bg-amber-500/20 text-amber-200 border-amber-500/40',
      accent: 'text-amber-300'
    },
    minimal: {
      border: 'border-slate-500/40 shadow-slate-500/10',
      headerBg: 'bg-white text-slate-950 font-black',
      badge: 'bg-slate-800 text-slate-300 border-slate-700',
      accent: 'text-white'
    }
  };

  const currentStyle = themes[activeTheme] || themes.gold;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left: The Physical Windshield Sticker Card */}
      <div className="lg:col-span-6 flex flex-col items-center">
        
        <div className="text-xs text-slate-400 mb-2 flex items-center justify-between w-full max-w-sm px-1">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Windshield Decal Preview</span>
          </div>

          {/* Wi-Fi vs Localhost Target Toggle */}
          <div className="flex items-center gap-1 bg-slate-900/90 px-2 py-0.5 rounded-lg border border-slate-800 text-[10px]">
            <button
              onClick={() => setQrHostMode('wifi')}
              className={`flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold transition-all ${
                qrHostMode === 'wifi' 
                  ? 'bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
              title="QR code encodes your Wi-Fi LAN IP so real phone cameras can scan and connect"
            >
              <Wifi className="w-3 h-3 text-amber-400" />
              <span>Mobile Wi-Fi</span>
            </button>
            <button
              onClick={() => setQrHostMode('localhost')}
              className={`flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold transition-all ${
                qrHostMode === 'localhost' 
                  ? 'bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Laptop className="w-3 h-3 text-amber-400" />
              <span>Local</span>
            </button>
          </div>
        </div>

        {/* Print cutting guide (visible when printed via @media print) */}
        <div className="print-cut-guide hidden">
          ✂ Cut along dashed border and affix to inside of front windshield glass
        </div>

        {/* The Decal Box */}
        <div 
          ref={decalRef}
          className={`windshield-decal-box w-full max-w-sm rounded-[28px] overflow-hidden bg-slate-950 border-2 ${currentStyle.border} shadow-2xl transition-all duration-300 relative`}
        >
          {/* Top Decal Banner */}
          <div className={`windshield-decal-header ${currentStyle.headerBg} p-4 text-center font-black tracking-wide`}>
            <div className="text-[11px] uppercase tracking-widest font-mono">PINGPARK VERIFIED DECAL</div>
            <div className="text-sm sm:text-base font-black font-['Space_Grotesk'] mt-0.5">
              BLOCKED BY THIS CAR?
            </div>
            <div className="text-[10px] font-semibold opacity-90">
              SCAN QR TO CALL / BUZZ OWNER
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
            <div className="border-2 border-amber-500/40 bg-slate-950 px-4 py-1.5 rounded-xl font-mono text-lg font-black text-white tracking-widest flex items-center gap-2 shadow-inner">
              <span className="text-xs text-amber-400 font-sans font-bold">IND</span>
              <span>{selectedVehicle.plateNumber}</span>
            </div>

            <div className="text-xs text-slate-300 font-semibold mt-1">
              {selectedVehicle.makeModel}
            </div>

            {/* Parking Status Badge */}
            <div className="mt-3">
              {selectedVehicle.parkingStatus === 'blocking' ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold animate-pulse">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Double-Parked (Available on Call)</span>
                </div>
              ) : selectedVehicle.parkingStatus === 'valet' ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Keys with Security Guard</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Parked in Safe Regular Bay</span>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Decal Footer */}
          <div className="bg-slate-950 p-3 text-center border-t border-slate-800/80 text-[10px] text-amber-400/80 font-mono">
            PINGPARK SECURE SMART DECAL • ZERO APP DOWNLOAD
          </div>
        </div>

        {/* Action Buttons: Print, Download, Test Scanner */}
        <div className="grid grid-cols-3 gap-2 mt-4 w-full max-w-sm">
          <button
            onClick={handlePrint}
            className="py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/25 transition-all hover:scale-105 active:scale-95"
            title="Print decal sticker with cutting guide lines"
          >
            <Printer className="w-4 h-4 text-slate-950" />
            <span>Print</span>
          </button>

          <button
            onClick={handleDownloadPng}
            className="py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 border border-amber-500/30 transition-all hover:scale-105 active:scale-95 shadow-md"
            title="Download QR code image as PNG"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Save PNG</span>
          </button>

          <button
            onClick={() => openScannerForVehicle(selectedVehicle)}
            className="py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-all hover:scale-105 active:scale-95"
            title="Test the mobile scanner interface"
          >
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>Scanner</span>
          </button>
        </div>

      </div>

      {/* Right: Owner Controls & Parking Status Settings */}
      <div className="lg:col-span-6 space-y-5">
        
        {/* Status Mode Box */}
        <div className="glass-panel p-6 rounded-3xl border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-black text-white font-['Space_Grotesk'] flex items-center gap-2">
              <Car className="w-5 h-5 text-amber-400" />
              <span>Current Parking Situation</span>
            </h3>
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
              title="Delete this car from your garage"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Update your car's status right now so anyone scanning knows your availability:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5">
            {[
              { id: 'blocking', label: 'Double-Parked', desc: 'Blocked someone; ready to move', icon: AlertTriangle, color: 'border-amber-400/80 bg-amber-950/40 text-amber-300' },
              { id: 'safe', label: 'Safe Bay', desc: 'Parked legally in stall', icon: CheckCircle2, color: 'border-yellow-400/80 bg-yellow-950/40 text-yellow-300' },
              { id: 'valet', label: 'Key with Guard', desc: 'Guard can move car', icon: ShieldCheck, color: 'border-amber-500/70 bg-amber-950/30 text-amber-200' },
            ].map(st => {
              const Icon = st.icon;
              const isSelected = selectedVehicle.parkingStatus === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => handleStatusChange(st.id)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    isSelected 
                      ? `${st.color} font-bold shadow-lg scale-105` 
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
                <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                <span>Live Note to Blocked Drivers:</span>
              </span>
              {!isEditingNote && (
                <button
                  onClick={() => setIsEditingNote(true)}
                  className="text-[11px] text-amber-400 hover:underline font-semibold"
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
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-amber-400 outline-none"
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
                    className="px-4 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs"
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
            <Palette className="w-4 h-4 text-amber-400" />
            <span>Customize Decal Sticker Style</span>
          </h3>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'gold', label: 'Bumblebee Gold', dot: 'bg-amber-400' },
              { id: 'hazard', label: 'Caution Yellow', dot: 'bg-yellow-400' },
              { id: 'honey', label: 'Warm Honey', dot: 'bg-amber-600' },
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
                    ? 'border-amber-400 bg-amber-400/20 text-white font-bold shadow-md'
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
