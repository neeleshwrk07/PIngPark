import React from 'react';
import { 
  BellRing, 
  Clock, 
  Send, 
  CheckCircle2, 
  Car, 
  AlertTriangle, 
  Sparkles,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useParkPing } from '../context/ParkPingContext';

export const OwnerAlertFeed = ({ isEmbedded = false }) => {
  const { activePings, replyToPing } = useParkPing();

  const unresolvedPings = activePings.filter(p => p.status === 'delivered');
  const pastPings = activePings.filter(p => p.status === 'owner_on_the_way' || p.status === 'resolved');

  const quickReplies = [
    '🏃 Coming down right now (2 mins)!',
    '🚗 Moving the car right away!',
    '🔑 Key is with security guard at Gate 1.',
    '⏱️ In elevator, be there in 3 minutes.',
  ];

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BellRing className={`w-5 h-5 ${unresolvedPings.length > 0 ? 'text-rose-400 animate-bounce' : 'text-slate-400'}`} />
          <h3 className="text-base font-black text-white font-['Space_Grotesk']">
            Owner Alert Telemetry & Inbox
          </h3>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          LIVE SSE ACTIVE
        </span>
      </div>

      {/* Unresolved / Urgent Incoming Pings */}
      {unresolvedPings.length > 0 ? (
        <div className="space-y-3">
          {unresolvedPings.map((ping) => (
            <div 
              key={ping.id}
              className="p-5 rounded-3xl bg-gradient-to-br from-rose-950/60 via-slate-900 to-amber-950/40 border-2 border-rose-500/70 shadow-2xl shadow-rose-500/20 text-xs space-y-3 animate-fadeIn"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping"></span>
                  <div>
                    <span className="font-black text-rose-300 font-mono tracking-wide text-sm">
                      {ping.reasonLabel}
                    </span>
                    <div className="text-[11px] text-slate-300">
                      Target Vehicle: <span className="font-bold text-white">{ping.vehiclePlate}</span>
                    </div>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  {new Date(ping.timestamp).toLocaleTimeString()}
                </span>
              </div>

              {/* Sender's Note */}
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-200">
                <div className="text-[10px] text-rose-400 font-semibold mb-1">Message from Blocked Driver:</div>
                <div className="text-xs font-medium italic">"{ping.senderNote}"</div>
                {ping.senderContact && (
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">
                    Sender Phone: {ping.senderContact}
                  </div>
                )}
              </div>

              {/* 1-Tap Quick Reply Buttons */}
              <div>
                <div className="text-[11px] font-bold text-slate-300 mb-2">
                  Tap 1-Click Response to Notify Driver:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {quickReplies.map((qr, idx) => (
                    <button
                      key={idx}
                      onClick={() => replyToPing(ping.id, qr)}
                      className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 text-left text-xs font-semibold border border-slate-700 hover:border-emerald-400 transition-all active:scale-95 flex items-center justify-between"
                    >
                      <span className="truncate">{qr}</span>
                      <Send className="w-3 h-3 shrink-0 ml-1 opacity-70" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 text-center text-slate-400 text-xs">
          <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-80" />
          <div className="font-bold text-white">All Clear! No Active Car Pings</div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            When someone scans your windshield QR, your phone/screen will instantly flash and chime here.
          </p>
        </div>
      )}

      {/* Past Resolved Pings History */}
      {pastPings.length > 0 && !isEmbedded && (
        <div className="glass-panel p-5 rounded-3xl border-slate-800 mt-6">
          <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider mb-3">
            Recent Alert History
          </h4>
          <div className="space-y-2">
            {pastPings.slice(0, 5).map((p) => (
              <div 
                key={p.id}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-semibold text-white">{p.vehiclePlate}</span>
                    <span className="text-slate-500 mx-1.5">•</span>
                    <span className="text-slate-400 text-[11px]">{p.reasonLabel.split('/')[0]}</span>
                    {p.ownerReply && (
                      <div className="text-[10px] text-emerald-300 italic">Replied: "{p.ownerReply}"</div>
                    )}
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">
                  {new Date(p.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
