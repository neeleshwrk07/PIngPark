import React, { useState } from 'react';
import { 
  Camera, 
  Car, 
  Search, 
  X, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  QrCode,
  AlertTriangle
} from 'lucide-react';
import { useParkPing } from '../context/ParkPingContext';

export const ScanRegisteredCarModal = () => {
  const { modals, closeModal, vehicles, openScannerForVehicle, selectedVehicle } = useParkPing();
  const [searchInput, setSearchInput] = useState('');
  const [simulatedScanSuccess, setSimulatedScanSuccess] = useState(false);

  if (!modals.scanAnyCar) return null;

  const handleSelectCar = (veh) => {
    setSimulatedScanSuccess(true);
    setTimeout(() => {
      setSimulatedScanSuccess(false);
      closeModal('scanAnyCar');
      openScannerForVehicle(veh);
    }, 400);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const clean = searchInput.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    const found = vehicles.find(v => {
      const vPlate = v.plateNumber.toUpperCase().replace(/[^A-Z0-9]/g, '');
      const vQr = v.qrCode.toUpperCase().replace(/[^A-Z0-9]/g, '');
      return vPlate.includes(clean) || vQr.includes(clean);
    });

    if (found) {
      handleSelectCar(found);
    } else {
      // Fallback virtual vehicle
      handleSelectCar(vehicles[0] || selectedVehicle);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel-glow max-w-lg w-full p-6 sm:p-8 rounded-3xl relative text-white border-amber-400/50 shadow-2xl overflow-hidden">
        
        <button
          onClick={() => closeModal('scanAnyCar')}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/20">
            <Camera className="w-6 h-6 stroke-[2.4]" />
          </div>
          <div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
              OPTICAL QR SCANNER
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] text-white mt-0.5">
              Scan Registered Car Decal
            </h2>
          </div>
        </div>

        {/* Camera Viewfinder Mockup */}
        <div className="relative rounded-2xl border-2 border-dashed border-amber-400/50 bg-[#090b12] p-6 mb-5 flex flex-col items-center justify-center min-h-[170px] overflow-hidden">
          {/* Laser Sweep */}
          <div className="laser-scanner"></div>

          {/* Viewfinder Corner Brackets */}
          <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-amber-400"></div>
          <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-amber-400"></div>
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-amber-400"></div>
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-amber-400"></div>

          <div className="relative z-10 flex flex-col items-center text-center space-y-1">
            <QrCode className="w-10 h-10 text-amber-400/80 animate-pulse" />
            <div className="text-xs font-bold text-white">Point Camera at Windshield Sticker</div>
            <div className="text-[11px] text-slate-400">or pick a parked vehicle below to simulate scan</div>
          </div>
        </div>

        {/* Option A: Search Plate Number */}
        <form onSubmit={handleSearchSubmit} className="mb-5">
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">
            Or Enter License Plate / Decal Token:
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
                placeholder="e.g. DL-01-AB-1234 or PING-..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono uppercase text-white focus:border-amber-400 outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Lookup</span>
            </button>
          </div>
        </form>

        {/* Option B: 1-Click Parked Cars Presets */}
        <div>
          <div className="text-[11px] font-bold text-slate-400 mb-2 flex items-center justify-between">
            <span>Select a Parked Car to Test Scan:</span>
            <span className="text-[10px] text-amber-400 font-mono">1-Tap Instant</span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {vehicles.map((v) => (
              <button
                key={v.id}
                onClick={() => handleSelectCar(v)}
                className="w-full p-3 rounded-xl bg-slate-900/80 hover:bg-amber-400 hover:text-slate-950 border border-slate-800 hover:border-amber-400 text-left transition-all flex items-center justify-between group active:scale-[0.99]"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 group-hover:bg-slate-950 group-hover:text-amber-400 flex items-center justify-center font-bold">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-mono text-xs font-bold text-white group-hover:text-slate-950">
                      {v.plateNumber}
                    </div>
                    <div className="text-[10px] text-slate-400 group-hover:text-slate-900">
                      {v.makeModel} • <span className="italic">{v.parkingStatus === 'blocking' ? 'Double-Parked' : 'Safe Bay'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400 group-hover:text-slate-950">
                  <span>Scan</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
