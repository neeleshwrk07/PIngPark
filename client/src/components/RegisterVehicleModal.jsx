import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  PlusCircle, 
  Car, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  X, 
  Sparkles,
  QrCode
} from 'lucide-react';
import { useParkPing } from '../context/ParkPingContext';

export const RegisterVehicleModal = () => {
  const { modals, closeModal, registerVehicle } = useParkPing();

  const [plateNumber, setPlateNumber] = useState('');
  const [makeModel, setMakeModel] = useState('');
  const [vehicleType, setVehicleType] = useState('SUV');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [statusNote, setStatusNote] = useState('Double-parked for 10 mins. Please ping and I will move right away!');
  const [privacyMode, setPrivacyMode] = useState('show_all');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!modals.registerVehicle) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!plateNumber.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    const res = await registerVehicle({
      plateNumber,
      makeModel: makeModel || 'Vehicle',
      vehicleType,
      ownerName: ownerName || 'Vehicle Owner',
      phone,
      whatsapp: whatsapp || phone,
      statusNote,
      privacyMode
    });
    setIsSubmitting(false);

    if (res.success) {
      try {
        confetti({ particleCount: 70, spread: 60 });
      } catch (e) {}
      closeModal('registerVehicle');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel-glow max-w-lg w-full p-6 sm:p-8 rounded-3xl relative text-white border-slate-700 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={() => closeModal('registerVehicle')}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <QrCode className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black font-['Space_Grotesk'] text-white">Register Car for QR Decal</h2>
            <p className="text-xs text-slate-400">Generate a smart contact decal to stick on your windshield</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">
                License Plate Number *
              </label>
              <input
                type="text"
                required
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
                placeholder="e.g. DL-01-AB-1234"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 font-mono text-sm uppercase text-white focus:border-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-300 block mb-1">
                Make & Model / Color
              </label>
              <input
                type="text"
                value={makeModel}
                onChange={(e) => setMakeModel(e.target.value)}
                placeholder="e.g. White Hyundai Creta"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">
                Owner Full Name
              </label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="e.g. Aarav Sharma"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-300 block mb-1">
                Vehicle Type
              </label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-emerald-500 outline-none"
              >
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Electric Vehicle">Electric Vehicle (EV)</option>
                <option value="Two Wheeler">Two Wheeler</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">
                Phone Number (for Calls) *
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 98765 43210"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-300 block mb-1">
                WhatsApp Number
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="Same as phone if empty"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-300 block mb-1">
              Double-Parking Windshield Note
            </label>
            <input
              type="text"
              value={statusNote}
              onChange={(e) => setStatusNote(e.target.value)}
              placeholder="e.g. Double-parked for 10 mins. Please ping and I will move right away!"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-300 block mb-1.5">
              Privacy Shield Mode:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { id: 'show_all', label: 'Direct Call & WhatsApp', desc: 'Display phone & WhatsApp for fastest response' },
                { id: 'whatsapp_only', label: 'WhatsApp Only', desc: 'Hide phone calling, allow WhatsApp chats' },
                { id: 'anonymous_ping_only', label: 'In-App Buzzer Only', desc: 'Completely hide phone number, receive app sirens' }
              ].map(pm => (
                <button
                  key={pm.id}
                  type="button"
                  onClick={() => setPrivacyMode(pm.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    privacyMode === pm.id
                      ? 'border-emerald-400 bg-emerald-500/20 text-white font-bold'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold text-xs">{pm.label}</div>
                  <div className="text-[10px] opacity-75">{pm.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 mt-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {isSubmitting ? 'Registering...' : 'Create Vehicle & Generate Windshield Decal'}
          </button>

        </form>

      </div>
    </div>
  );
};
