import React, { useState } from 'react';
import { 
  BellRing, 
  Clock, 
  Send, 
  CheckCircle2, 
  Car, 
  AlertTriangle, 
  Sparkles,
  ShieldCheck,
  Zap,
  Check
} from 'lucide-react';
import { useParkPing } from '../context/ParkPingContext';

export const OwnerAlertFeed = ({ isEmbedded = false }) => {
  const { activePings, replyToPing, resolvePing } = useParkPing();
  const [customReplies, setCustomReplies] = useState({});

  const urgentPings = activePings.filter(p => p.status === 'delivered' || p.status === 'owner_on_the_way');
  const pastPings = activePings.filter(p => p.status === 'resolved');

  const quickReplies = [
    '🏃 Coming down right now (2 mins)!',
    '🚗 Moving the car right away!',
    '🔑 Key is with security guard at Gate 1.',
    '⏱️ In elevator, be there in 3 minutes.',
  ];

  const handleCustomSubmit = (e, pingId) => {
    e.preventDefault();
    const text = customReplies[pingId];
    if (text && text.trim()) {
      replyToPing(pingId, text.trim());
      setCustomReplies(prev => ({ ...prev, [pingId]: '' }));
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BellRing className={`w-5 h-5 ${urgentPings.length > 0 ? 'text-rose-400 animate-bounce' : 'text-slate-400'}`} />
          <h3 className="text-base font-black text-white font-['Space_Grotesk']">
            Owner Alert Telemetry & Inbox
          </h3>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          LIVE SSE ACTIVE
        </span>
      </div>

      {/* Unresolved / Urgent Incoming Pings */}
      {urgentPings.length > 0 ? (
        <div className="space-y-3">
          {urgentPings.map((ping) => {
            const isWaitingReply = ping.status === 'delivered';
            const hasReplied = ping.status === 'owner_on_the_way';

            return (
              <div 
                key={ping.id}
                className={`p-5 rounded-3xl border-2 transition-all text-xs space-y-3 animate-fadeIn ${
                  isWaitingReply 
                    ? 'bg-gradient-to-br from-rose-950/70 via-slate-900 to-amber-950/40 border-rose-500/70 shadow-2xl shadow-rose-500/20' 
                    : 'bg-slate-900/90 border-cyan-500/50 shadow-xl'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-3 h-3 rounded-full ${isWaitingReply ? 'bg-rose-500 animate-ping' : 'bg-cyan-400'}`}></span>
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

                {/* If owner already replied */}
                {hasReplied && (
                  <div className="p-3 rounded-xl bg-cyan-950/50 border border-cyan-500/40 text-cyan-200 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-cyan-400">You Replied:</div>
                      <div className="font-semibold italic">"{ping.ownerReply}"</div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(ping.repliedAt).toLocaleTimeString()}
                    </span>
                  </div>
                )}

                {/* 1-Tap Quick Reply Buttons */}
                <div>
                  <div className="text-[11px] font-bold text-slate-300 mb-2">
                    {hasReplied ? 'Send Another Update:' : 'Tap 1-Click Response to Notify Driver:'}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
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

                  {/* Custom typed reply form */}
                  <form onSubmit={(e) => handleCustomSubmit(e, ping.id)} className="flex gap-2">
                    <input
                      type="text"
                      value={customReplies[ping.id] || ''}
                      onChange={(e) => setCustomReplies({ ...customReplies, [ping.id]: e.target.value })}
                      placeholder="Or type a custom reply..."
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-cyan-400 outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!customReplies[ping.id]?.trim()}
                      className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all"
                    >
                      <span>Send</span>
                      <Send className="w-3 h-3" />
                    </button>
                  </form>
                </div>

                {/* Mark as Moved / Exit Cleared Button */}
                <div className="pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => resolvePing(ping.id)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-500 hover:text-slate-950 text-emerald-300 font-bold text-xs border border-emerald-500/40 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <Check className="w-4 h-4" />
                    <span>Car Moved • Mark as Cleared & Resolved</span>
                  </button>
                </div>

              </div>
            );
          })}
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
