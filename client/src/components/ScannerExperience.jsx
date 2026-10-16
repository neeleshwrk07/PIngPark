import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  PhoneCall, 
  MessageSquare, 
  BellRing, 
  Car, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  X, 
  Clock, 
  Sparkles,
  Zap,
  RotateCcw,
  MessageCircle,
  HeartHandshake
} from 'lucide-react';
import { useParkPing } from '../context/ParkPingContext';

export const ScannerExperience = ({ vehicleOverride = null, isEmbedded = false, onClose = null }) => {
  const { scannerVehicle, selectedVehicle, sendPing, scannerSentPing, setScannerSentPing, modals, closeModal } = useParkPing();

  const vehicle = vehicleOverride || scannerVehicle || selectedVehicle;

  const [selectedReason, setSelectedReason] = useState('BLOCKING_CAR');
  const [customNote, setCustomNote] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [isSending, setIsSending] = useState(false);

  if (!isEmbedded && !modals.scannerView) return null;

  if (!vehicle) {
    return (
      <div className="p-8 text-center text-slate-400 text-xs">
        No vehicle selected to scan.
      </div>
    );
  }

  const handleSendPing = async () => {
    setIsSending(true);
    const res = await sendPing({
      qrCode: vehicle.qrCode,
      reason: selectedReason,
      senderNote: customNote || 'Please move your car so I can exit.',
      senderContact
    });
    setIsSending(false);
  };

  // Contact links
  const cleanPhone = (vehicle.whatsapp || vehicle.phone || '').replace(/[^0-9]/g, '');
  const waMessage = encodeURIComponent(
    `[PingPark Alert] Hi, your vehicle ${vehicle.plateNumber} (${vehicle.makeModel}) is currently blocking my exit. Please move it so I can take my car out. Thank you!`
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${waMessage}`;
  const telUrl = `tel:${vehicle.phone || ''}`;
  const smsUrl = `sms:${cleanPhone}?body=${waMessage}`;

  const reasons = [
    { id: 'BLOCKING_CAR', label: '🚨 Car Blocked / Need Exit', icon: Car },
    { id: 'LIGHTS_ON', label: '⚡ Headlights Left ON', icon: Zap },
    { id: 'WINDOW_DOWN', label: '🪟 Window Down / Door Ajar', icon: AlertTriangle },
    { id: 'PET_ALERT', label: '🐶 Pet / Child Inside Car', icon: HeartHandshake },
    { id: 'TOW_WARNING', label: '⚠️ Tow Truck Active Here', icon: AlertTriangle },
    { id: 'EMERGENCY', label: '🚑 Scratched / Emergency', icon: BellRing },
  ];

  const renderContactOptions = (isCompact = false) => {
    if (vehicle.privacyMode === 'anonymous_ping_only') {
      return (
        <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <div className="font-bold text-white">Owner Privacy Shield Active</div>
            <div className="text-[11px] text-amber-300/80">Phone number is hidden for security. Tap the buzzer button above to sound the owner's car horn siren directly!</div>
          </div>
        </div>
      );
    }

    if (vehicle.privacyMode === 'whatsapp_only') {
      return (
        <div className="space-y-1.5">
          <div className="text-[11px] text-slate-400 font-semibold flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            <span>Owner Contact (WhatsApp Preferred):</span>
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.01]"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Message Owner via WhatsApp</span>
          </a>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-3 gap-2">
        <a
          href={telUrl}
          className={`${isCompact ? 'py-2.5' : 'py-3'} px-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-all hover:scale-[1.01]`}
        >
          <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
          <span>Call</span>
        </a>
        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className={`${isCompact ? 'py-2.5' : 'py-3'} px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.01]`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>
        <a
          href={smsUrl}
          className={`${isCompact ? 'py-2.5' : 'py-3'} px-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-all hover:scale-[1.01]`}
        >
          <MessageCircle className="w-3.5 h-3.5 text-amber-300" />
          <span>SMS</span>
        </a>
      </div>
    );
  };

  const content = (
    <div className="space-y-5 animate-fadeIn">
      
      {/* Top Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/25">
          <Car className="w-6 h-6 stroke-[2.4]" />
        </div>
        <div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
            PINGPARK WINDSHIELD DECAL
          </span>
          <h2 className="text-xl font-black font-['Space_Grotesk'] text-white mt-0.5">
            {vehicle.makeModel}
          </h2>
          <div className="font-mono text-xs text-amber-300 font-bold tracking-wider">
            PLATE: {vehicle.plateNumber}
          </div>
        </div>
      </div>

      {/* Owner's Live Parking Note */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
        <div className="text-slate-400 font-medium text-[11px] flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>Owner's Current Status & Note:</span>
        </div>
        <p className="text-slate-200 font-semibold italic">
          "{vehicle.statusNote || 'Double parked. Please ping me to move!'}"
        </p>
      </div>

      {/* Live State Tracker if ping already sent */}
      {scannerSentPing ? (
        <div className="p-5 rounded-3xl bg-slate-900/95 border border-amber-400/40 text-xs space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 animate-bounce text-amber-400" />
            </div>
            <div>
              <div className="font-black text-sm text-white font-['Space_Grotesk']">
                Move Alert Sent to Owner!
              </div>
              <div className="text-[11px] text-slate-400">
                Owner's device has buzzed with your move request
              </div>
            </div>
          </div>

          {/* Real-time reply from owner */}
          {scannerSentPing.status === 'owner_on_the_way' || scannerSentPing.status === 'resolved' ? (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 to-yellow-950/60 border border-amber-400 text-white space-y-1 animate-fadeIn">
              <div className="text-amber-400 font-black text-xs flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>OWNER REPLIED:</span>
              </div>
              <div className="text-base font-black text-white font-['Space_Grotesk']">
                "{scannerSentPing.ownerReply}"
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                Received at: {new Date(scannerSentPing.repliedAt || Date.now()).toLocaleTimeString()}
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3 text-slate-400 text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
              <span>Waiting for owner to acknowledge ("On my way")...</span>
            </div>
          )}

          {/* Alternate Direct Contact Links */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <div className="text-[11px] text-slate-400 font-semibold">Fast direct contact channels:</div>
            {renderContactOptions(true)}
          </div>

          {/* Reset / Send Another Alert */}
          <button
            onClick={() => setScannerSentPing(null)}
            className="w-full py-2 rounded-xl bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Send Follow-up Note or Report Another Issue</span>
          </button>
        </div>
      ) : (
        /* The Ping Form */
        <div className="space-y-4">
          
          {/* Reason Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">
              Select Alert Reason:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {reasons.map(r => {
                const Icon = r.icon;
                const isSel = selectedReason === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedReason(r.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center gap-2 ${
                      isSel 
                        ? 'border-amber-400 bg-amber-500/20 text-amber-200 shadow-md' 
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="truncate">{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom message to owner */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">
              Add a Specific Note / Location (Optional):
            </label>
            <input
              type="text"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="e.g. Blocked behind your car in Bay 42 with baby, urgent!"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:border-amber-400 outline-none"
            />
          </div>

          {/* Quick Instant Ping Button */}
          <button
            onClick={handleSendPing}
            disabled={isSending}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:scale-[1.02] active:scale-[0.98] text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
          >
            <BellRing className="w-5 h-5 text-slate-950 animate-pulse" />
            <span>{isSending ? 'Transmitting Ping...' : '🚨 Buzz Owner to Move Car'}</span>
          </button>

          {/* Direct Contact Options with Privacy Shield Guard */}
          <div className="pt-2">
            <div className="flex items-center gap-3 my-2 text-[10px] text-slate-500">
              <div className="flex-1 h-px bg-slate-800"></div>
              <span>DIRECT CONTACT CHANNELS</span>
              <div className="flex-1 h-px bg-slate-800"></div>
            </div>

            {renderContactOptions(false)}
          </div>

        </div>
      )}

    </div>
  );

  // If embedded inside Split-Screen Simulator:
  if (isEmbedded) {
    return content;
  }

  // Standalone Modal:
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel-glow max-w-md w-full p-6 rounded-3xl relative text-white border-amber-500/40 shadow-2xl">
        <button
          onClick={() => {
            if (onClose) onClose();
            else closeModal('scannerView');
          }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {content}
      </div>
    </div>
  );
};
